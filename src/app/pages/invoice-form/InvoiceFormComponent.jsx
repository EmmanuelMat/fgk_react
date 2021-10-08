import { Paper, makeStyles } from "@material-ui/core";
import { Button } from "react-bootstrap";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Dropdown from "../../partials/content/custom-components/Dropdown";
import {
  invoiceFixedValues,
  invoiceFormConfig,
  nameContants,
  selectedItemsColumns,
} from "./form-config";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import PrintOutlinedIcon from "@material-ui/icons/PrintOutlined";
import service from "../billing/service";
import SearchInput from "../../partials/content/custom-components/SearchInput";
import Bill from "../billing/classes/Bill";
import DataGridComponent from "../../partials/content/custom-components/DataGridComponent";
import _helpers from "../../helpers/_helpers";
import _ from "lodash";
import NoteModal from "../common/NoteModal";
import ProductModal from "./components/ProductModal";
import SaveModal from "./components/SaveModal";
import { connect, useDispatch } from "react-redux";
import { setTabState } from "../../actions/tabsAction";
import "./styles.css";
import FormContainer from "./components/FormContainer";
import SubmitModal from "./components/SubmitModal";
import { billObject, _setDetails, _setTaxReciept } from "./billObject";
import ClienModel from "../../../models/client.model";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto",
    padding: 20,
  },
  table: {
    minWidth: 650,
  },
  selectTableCell: {
    width: 60,
  },
  tableCell: {
    width: 130,
    height: 40,
  },
  input: {
    width: 130,
    height: 40,
  },
}));

const InvoiceFormComponent = ({ activeTab, tabState }) => {
  const closeModalRef = useRef();
  const printRef = useRef();

  const classes = useStyles();
  const [reciptTypes, setReciptTypes] = useState([]);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showPrinterModal, setShowPrinterModal] = useState(false);
  const [savedBillId, setSavedBillId] = useState("");
  const [recieptType, setrecieptType] = useState("5ffb47828f1bc6e77a8791ba");
  const [bill, setBill] = useState(new Bill());
  const [bill2, setBill2] = useState(billObject);
  const [option, setOption] = useState();
  const [inputFields, setInputFields] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);

  const dispatch = useDispatch();

  const handleRecieptTypeSelect = (event) => {
    event.persist();
    setrecieptType(event.target.value);
  };

  const _setPrice = () => {
    setInputFields({
      ...inputFields,
      [nameContants.TOTAL]: bill2.totalPrice,
      [nameContants.TAX]: bill2.tax,
      [nameContants.SUBTOTAL]: bill2.subTotal,
      [nameContants.DISCOUNT]: bill2.discount,
    });
  };

  const setNote = (val) => {
    setBill2((prev) => {
      prev.notes = val;
      return prev;
    });
  };

  const onTaxReciepsChange = async (val) => {
    const taxRecieptId = await service.genTaxReciept(val);
    const { lastRecord, sequense } = taxRecieptId.data;
    bill.settaxReciept(lastRecord, sequense);
    setBill2((prev) => {
      prev.taxReciept = _setTaxReciept(lastRecord, sequense);
      return prev;
    });
    setInputFields({ ...inputFields, [nameContants.NCF]: sequense });
  };

  const _setClient = (data) => {
    setBill2((prev) => {
      prev.client = new ClienModel(data);
      return prev;
    });
  };

  const priceChange = (items) => {
    let total = 0;
    if (!Array.isArray(items) || items.length === 0)
      return { total: 0, subTotal: 0, tax: 0 };

    if (!Array.isArray(items) || items.length === 1) {
      total = parseFloat(items[0].sellPrice);
    } else {
      total = items.reduce((a, b) => {
        return a + parseFloat(b.sellPrice || 0) * parseInt(b.quantity);
      }, 0);
    }
    const subTotal = total / 1.18;
    const tax = total - subTotal;
    return { total, subTotal, tax };
  };

  const handleProductSelect = (data) => {
    let product = Object.create(data);
    if (!product._id) return;
    product.id = product._id;
    product.quantity = 1;
    product.price = parseFloat(product.price).toFixed(2);
    setSelectedItems([...selectedItems, product]);
    setBill2((prev) => {
      const item = _setDetails(product);
      prev.details = [...prev.details, item];
      return prev;
    });
  };

  useEffect(() => {
    console.log('test');
    setBill2((prev) => {
      const priceObj = priceChange(bill2.details);
      prev.totalPrice = priceObj.total;
      prev.subTotal = priceObj.subTotal;
      prev.tax = priceObj.tax;
      return prev;
    });
  }, [bill2.details]);

  useEffect(() => {
    _setPrice();
  }, [bill2.totalPrice]);

  const handleCellChange = (data) => {
    if (!data.props || !data.props.value) return;
    onTableCellChange(data.id, data.field, data.props.value);
  };

  const handleInputChange = (e) => {
    if (e.target.name === nameContants.DISCOUNT) {
      const dis = parseFloat(e.target.value) || "";
      setInputFields({
        ...inputFields,
        [nameContants.DISCOUNT]: dis,
      });
    }
  };

  const onTableCellChange = (_id, key, value) => {
    const dKey = key === "price" ? "sellPrice" : key;
    const index = bill.details.findIndex((item) => item.product === _id);
    const newElement = bill2.details[index];
    newElement[dKey] = parseFloat(value);
    setBill2((prev) => {
      prev.details.splice(index, 1, newElement);
      prev.details = [...prev.details]
      return prev;
    });
    // bill.details.splice(index, 1, newElement);
  };

  const reset = () => {
    setBill(billObject);
    setSelectedItems([]);
  };

  useEffect(() => {
    if (tabState && tabState[activeTab]?.tabState) {
      const state = tabState[activeTab].tabState;
      setSelectedItems(state.selectedItems);
      setBill(state.bill);
    }
    _setPrice();
    service.getTaxReceipt().then((res) => setReciptTypes(res.data));
    service.getLastReciept().then((res) => {
      setInputFields({
        ...inputFields,
        [nameContants.INVOICE_NUMBER]: res.data.billNumer + 1,
        [nameContants.DATE]: _helpers._date().value,
      });
    });
  }, []);

  const handleCellClick = (params) => {
    if (params.field === "delete") {
      const index = selectedItems.findIndex((x) => x.id === params.row.id);
      const temp = [...selectedItems];
      bill.details.splice(index, 1);
      temp.splice(index, 1);
      setSelectedItems(temp);
      // bill.setprice();
      // _setPrice();
    }
  };

  const submit = (opt) => {
    setShowSubmitModal(true);
    setOption(opt);
  };

  const handleSubmit = async (val) => {
    console.log(bill2);
    if (typeof val !== "number") return;
    bill.amountPaid = val;
    const res = await bill.save();
    if (!res.data?._id) return;
    if (option === "print") {
      service.printReciept(res.data._id);
    } else if (option === "save") {
      setShowPrinterModal(true);
      setSavedBillId(res.data._id);
    }
  };

  useMemo(() => {
    dispatch(
      setTabState({ id: activeTab, tabState: { bill2, selectedItems } })
    );
  }, [bill2, selectedItems]);

  useEffect(() => {
    onTaxReciepsChange(recieptType);
  }, [recieptType]);

  return (
    <>
      <Paper className={classes.root}>
        <div className="d-flex justify-content-around">
          <FormContainer
            {...{
              data: invoiceFixedValues,
              handleInputChange,
              values: inputFields,
            }}
          />
          <div className="mb-3">
            <label className="form-label">Tipo de factura</label>
            <Dropdown
              defaultValue={recieptType}
              onChange={handleRecieptTypeSelect}
              data={reciptTypes}
            />
          </div>
          <div className="mb-3">
            <SearchInput
              {...{
                outerValue: bill.client,
                label: "Cliente",
                getData: service.getClientByNameOrId,
                onSelect: _setClient,
              }}
            />
          </div>
          <div
            style={{
              alignItems: "flex-end",
              justifyContent: "space-evenly",
              display: "flex",
            }}
          >
            <ProductModal
              ref={closeModalRef}
              handleProductSelect={handleProductSelect}
            />
            <Button id="small" size="sm" variant="outline-primary">
              <NoteModal onSave={setNote} />
            </Button>
            <Button
              onClick={() => submit("save")}
              id="save"
              size="sm"
              variant="outline-success"
            >
              <SaveIcon />
            </Button>
            <Button
              onClick={() => submit("print")}
              id="small"
              size="sm"
              variant="outline-danger"
            >
              <PrintOutlinedIcon />
            </Button>
            <Button
              onClick={reset}
              type="submit"
              id="small"
              size="sm"
              variant="outline-danger"
            >
              <DeleteIcon />
            </Button>
          </div>
        </div>
      </Paper>
      <Paper className={classes.root}>
        <div className="d-flex justify-content-around">
          <FormContainer
            {...{
              data: invoiceFormConfig,
              handleInputChange,
              values: inputFields,
            }}
          />
        </div>
      </Paper>
      <div style={{ width: "100%" }}>
        <Paper className={classes.root}>
          <DataGridComponent
            rows={selectedItems}
            columns={selectedItemsColumns}
            onCellChange={handleCellChange}
            onCellClick={handleCellClick}
          />
        </Paper>
      </div>
      <SaveModal
        showPrinterModal={showPrinterModal}
        printReciept={() => null}
        print={() => null}
        onClose={reset}
        _id={savedBillId}
        ref={printRef}
      />
      <SubmitModal
        {...{
          setShowSubmitModal,
          showModalFormOutSide: showSubmitModal,
          bill,
          onClose: () => {},
          onSave: handleSubmit,
        }}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  activeTab: state.tabs.active,
  tabState: state.tabs.tabState,
});

export default connect(mapStateToProps)(InvoiceFormComponent);
