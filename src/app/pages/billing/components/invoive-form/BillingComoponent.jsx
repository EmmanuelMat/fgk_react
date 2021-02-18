import React, { Component } from "react";
import { Container, CssBaseline, LinearProgress } from "@material-ui/core";
import TopForm from "./TopForm";
import service from "../../service";
import _ from "lodash";
import TaxRecipt from "../../classes/TaxRecipt";
import Bill from "../../classes/Bill";
import TableComponent from "./TableComponent";
import _helpers from "../../../../helpers/_helpers";
import RecieptDetailsModel from "../../../../../models/reciept.details.model";
import ReactIf from "../../../../helpers/ReactIf";
import ClienModel from "../../../../../models/client.model";

const initState = {
  taxRecieps: [],
  lastReciept: "",
  selectedTaxReciept: "",
  products: [],
  selectedProduct: [],
  recieptTable: [],
  taxRecieptId: "",
  discount: 0,
  bill: [],
  loading: true,
};

export default class BillingComoponent extends Component {
  constructor() {
    super();
    this.state = initState;
  }

  async componentDidMount() {
    this.getAll();
  }
setselectedTaxReciept =(val) =>{
  this.setState({val})
}
  getAll = async () => {
    let taxRecieps = await service.getTaxReceipt();
    const lastReciept = await service.getLastReciept();
    this.getProducts(null, null, null);
    taxRecieps = _helpers._select(taxRecieps.data, ["_id", "name"]);

    this.setState({
      taxRecieps: taxRecieps.reverse(),
      lastReciept: lastReciept.data.billNumer + 1,
      bill: this.props.bill,
      loading: false,
    });
    this.onTaxReciepsChangeHelper(taxRecieps)
  };

  onTaxReciepsChangeHelper(taxRecieps) {
    this.onTaxReciepsChange(null);
  }
  onTaxReciepsChange = async (val) => {
    const  taxRecieptId = await service.genTaxReciept(val);
    const {lastRecord, sequense}= taxRecieptId.data
     this.state.bill.settaxReciept(lastRecord, sequense);
     this.setState({taxRecieptId: sequense})
  };

  getClient = async (name, id, cb) => {
    if (name || id) {
      const client = await service.getClientByNameOrId(name, id);
      cb(client.data);
    }
  };
  getProducts = async (pageNumber, pageSize, name) => {
    const products = await service.getProducts(pageNumber, pageSize, name);
    const data = _helpers._select(products.data.data, [
      "code",
      "name",
      "cost",
      "unit",
      "price",
      "_id",
    ]);
    this.setState({
      products: { data, count: products.data.count },
    });
  };

  onProductSelect = (data) => {
    if (!this.state.recieptTable.includes(data)) {
      const product = data;
      product.quantity = 1;
      this.state.bill.setdetails(data);
      this.props.settable([...this.props.table, product]);
      this.setState({
        selectedProduct: product,
      });
      this.state.bill.setprice();
    }
  };

  deleteFromBill = (data) => {
    const index = _.findIndex(this.props.table, (x) => x.code === data.code, 0);
    this.state.bill.removeDetails(data);
    let newArray = this.props.table;
    newArray.splice(index, 1);
    this.props.settable([...newArray]);
  };

  onTableCellChange = (newRows, row, key) => {
    const dKey = key === "price" ? "sellPrice" : key;
    const index = _.findIndex(
      this.state.bill.details,
      (x) => x.code === row.code,
      0
    );
    let newElement = {
      ...this.state.bill.details[index],
      [dKey]: parseFloat(row[key]),
    };

    newElement = new RecieptDetailsModel(newElement);
    this.state.bill.details.splice(index, 1, newElement);
    this.props.settable([...newRows]);
    this.state.bill.setprice();
  };

  setDiscount = (discount) => {
    this.setState({ discount });
  };

  setClient = (data) => {
    this.state.bill.client = new ClienModel(data);
  };

  setNotes = (val) => {
    this.state.bill.notes = val;
  };

  reset = () => {
    this.setState(initState, this.getAll);
    this.props.settable([]);
    this.props.setbill(new Bill());
  };
  render() {
    return (
      <>
        <CssBaseline />
        <Container fixed>
          <ReactIf condition={!this.state.loading} Or={<LinearProgress />}>
            <TopForm
              onTaxReciepsChange={this.onTaxReciepsChange}
              taxRecieps={this.state.taxRecieps}
              lastReciept={this.state.lastReciept}
              getClient={this.getClient}
              products={this.state.products}
              getProducts={this.getProducts}
              onProductSelect={this.onProductSelect}
              taxReciept={this.state.taxRecieptId}
              setDiscount={this.setDiscount}
              discount={this.state.discount}
              setDiscountPorcentage={(val) => (this.state.bill.discount = val)}
              setClientIfEmpty={this.setClient}
              printReciept={service.printReciept}
              reset={this.reset}
              setNotesProps={this.setNotes}
              billData={this.props.bill}
            />

            <TableComponent
              onTableCellChange={this.onTableCellChange}
              data={this.props.table}
              deleteRow={this.deleteFromBill}
            />
          </ReactIf>
        </Container>
      </>
    );
  }
}
