import { Paper, makeStyles } from "@material-ui/core";
import { Button } from "react-bootstrap";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Dropdown from "../../partials/content/custom-components/Dropdown";
import Alert from "@material-ui/lab/Alert";

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
import { createBillObject, _setDetails, _setTaxReciept } from "./billObject";
import ClienModel from "../../../models/client.model";
import TaxRecieptModel from "../../../models/tax.reciept.model";
import CustomizedSnackbars from "../../partials/content/custom-components/CustomizedSnackbars";

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

const InvoiceFormComponent = ({ activeTab, tabState, closeTab }) => {
  const closeModalRef = useRef();
  const printRef = useRef();

  const classes = useStyles();
  const [validBill, setValidBill] = useState(false);
  const [reciptTypes, setReciptTypes] = useState([]);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [bill2, setBill2] = useState(() => createBillObject({}));
  const [showPrinterModal, setShowPrinterModal] = useState(false);
  const [savedBillId, setSavedBillId] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [client, setClient] = useState({});
  const [amountPaid, setAmountPaid] = useState(0);
  const [billNumber, setBillNumber] = useState(0);
  const [notes, setNotes] = useState("");
  const [discount, setDiscount] = useState(0);
  const [taxReciept, setTaxReciept] = useState(
    new TaxRecieptModel("", "", "5ffb47828f1bc6e77a8791ba", true, "")
  );
  const [recieptType, setrecieptType] = useState(
    taxReciept.taxReciept || "5ffb47828f1bc6e77a8791ba"
  );
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
      [nameContants.TOTAL]: totalPrice,
      [nameContants.TAX]: tax,
      [nameContants.SUBTOTAL]: subTotal,
      [nameContants.DISCOUNT]: discount,
    });
  };

  const setNote = (val) => {
    setNotes(val);
  };

  const onTaxReciepsChange = async (val) => {
    const taxRecieptId = await service.genTaxReciept(val);
    const { lastRecord, sequense } = taxRecieptId.data;

    let temp = _setTaxReciept(lastRecord, sequense);
    temp = _.pick(temp, ["_id", "taxReciept", "type", "sequence", "isUsed"]);

    setTaxReciept(temp);

    setInputFields({ ...inputFields, [nameContants.NCF]: sequense });
  };

  const _setClient = (data) => {
    setClient(new ClienModel(data));
  };

  const priceChange = (items) => {
    let total = 0;
    if (!Array.isArray(items) || items.length === 0)
      return { total: 0, subTotal: 0, tax: 0 };

    if (items.length === 1) {
      total = parseFloat(items[0].price) * parseFloat(items[0].quantity);
    } else {
      total = items.reduce((a, b) => {
        return a + parseFloat(b.price || 0) * parseInt(b.quantity);
      }, 0);
    }
    const subTotal = total / 1.18;
    const tax = total - subTotal;
    return { total, subTotal, tax };
  };

  const handleProductSelect = (data) => {
    let product = Object.create(data);
    console.log(selectedItems.some(item => item._id === product._id))
    if (!product._id || selectedItems.some(item =>  item._id === product._id)) return;
    product.id = product._id;
    product.quantity = 1;
    product.price = parseFloat(product.price).toFixed(2);
    setSelectedItems([...selectedItems, product]);
    closeModalRef.current.click();
  };

  useEffect(() => {
    const { total, subTotal, tax } = priceChange(selectedItems);
    setTotalPrice(total);
    setSubTotal(subTotal);
    setTax(tax);
  }, [selectedItems]);

  useEffect(() => {
    _setPrice();
  }, [totalPrice]);

  const handleCellChange = (data) => {
    if (!data.props || Number.isNaN(parseInt(data.props.value))) return;
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
    const index = selectedItems.findIndex((item) => item._id === _id);
    const newElement2 = selectedItems[index];

    newElement2[key] = parseFloat(value);

    const temp = [...selectedItems];
    temp.splice(index, 1, newElement2);
    setSelectedItems([...temp]);
  };

  const reset = () => {
    setTotalPrice(0);
    setSubTotal(0);
    setTax(0);
    setClient({});
    setAmountPaid(0);
    // setBillNumber
    setNotes("");
    setDiscount(0);
    setTaxReciept(
      new TaxRecieptModel("", "", "5ffb47828f1bc6e77a8791ba", true, "")
    );
    setSelectedItems([]);
  };

  const _setState = (bill) => {
    setTotalPrice(bill.totalPrice);
    setSubTotal(bill.subTotal);
    setTax(bill.tax);
    setClient(bill.client);
    setAmountPaid(bill.amountPaid);
    // setBillNumber
    setNotes(bill.notes);
    setDiscount(bill.discount);
    setTaxReciept(bill.taxReciept);
    _setPrice()
  };

  useEffect(() => {
    if (tabState && tabState[activeTab]?.tabState) {
      const state = tabState[activeTab].tabState;
      setSelectedItems(state.selectedItems);
      _setState(state.bill2);
      setrecieptType(state.recieptType);
      setNotes(state.notes);
    }
    service.getTaxReceipt().then((res) => setReciptTypes(res.data));
    service.getLastReciept().then((res) => {
      setInputFields({
        ...inputFields,
        [nameContants.INVOICE_NUMBER]: res.data.billNumer + 1,
        [nameContants.DATE]: _helpers._date().value,
      });
    });
  }, []);

  const _createBillObject = () =>
    createBillObject({
      totalPrice,
      subTotal,
      tax,
      client,
      amountPaid,
      billNumer: billNumber,
      details: selectedItems,
      notes,
      discount,
      taxReciept,
    });

  const handleCellClick = (params) => {
    if (params.field === "delete") {
      const index = selectedItems.findIndex((x) => x.id === params.row.id);
      const temp = [...selectedItems];
      temp.splice(index, 1);

      setSelectedItems(temp);
    }
  };

  const submit = (opt) => {
    if (selectedItems.length === 0 || !client.name) {
      setValidBill(true);
      return;
    }
    setBill2(_createBillObject());
    setShowSubmitModal(true);
    setOption(opt);
  };

  const save = async (val) => {
    const data= {...bill2}
    data.amountPaid = val
    if (bill2._id) {
      return await service.saveBill(data);
    } else {
      return service.saveBill(data);
    }
  };

  const handleSubmit = async (val, conduce, copy) => {
    if (typeof val !== "number") return;

    setAmountPaid(val);

    const res = await save(val);
    if (!res.data?._id) return;
    if (option === "print") {
      service.printReciept(res.data._id, conduce, copy);
      alert(`Devuelta $${(parseFloat(val) - parseFloat(totalPrice)).toFixed(2)}`)
      closeTab()
    } else if (option === "save") {
      setShowPrinterModal(true);
      setSavedBillId(res.data._id);
    }
  };

  useEffect(() => {
    dispatch(
      setTabState({
        id: activeTab,
        tabState: {
          bill2: _createBillObject(),
          selectedItems,
          recieptType,
          notes,
        },
      })
    );
  }, [bill2, notes, client, selectedItems, recieptType]);

  useEffect(() => {
    onTaxReciepsChange(recieptType);
  }, [recieptType]);

  return (
    <>
      <Paper className={classes.root}>
        <div style={{ width: "100%" }}>
          <CustomizedSnackbars
            {...{
              show: validBill,
              message: "Agregar productos o cliente.",
              onClose: setValidBill,
              severity: "warning",
            }}
          />
        </div>

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
                outerValue: client,
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
              <NoteModal notes={notes} onSave={setNote} />
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
        onClose={closeTab}
        _id={savedBillId}
        ref={printRef}
      />

      <SubmitModal
        {...{
          setShowSubmitModal,
          showModalFormOutSide: showSubmitModal,
          bill: bill2,
          onClose: () => closeTab(),
          onSave: handleSubmit,
        }}
      />
    </>
  );
};

const mapStateToProps = (state) => ({
  // activeTab: state.tabs.active,
  tabState: state.tabs.tabState,
});

export default connect(mapStateToProps)(InvoiceFormComponent);
