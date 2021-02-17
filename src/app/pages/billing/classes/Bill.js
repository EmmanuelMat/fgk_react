import ClienModel from "../../../../models/client.model";
import RecieptDetailsModel from "../../../../models/reciept.details.model";
import TaxRecieptModel from "../../../../models/tax.reciept.model";
import _ from "lodash";
import _helpers from "../../../helpers/_helpers";
import service from "../service";
export default class Bill {
  _id;
  totalPrice = 0;
  subTotal = 0;
  tax = 0;
  isCredit = false;
  client = {};
  payDate = new Date();
  details = [];
  taxReciept = new TaxRecieptModel("", "", true, "");
  discount = 0;
  billNumer;
  notes;

  setDiscount = (discount) => {
    if (discount) {
      this.discount = discount;
      this.totalPrice = this.totalPrice - parseInt(discount);
    }
  };

  setIsCredit = (valueAsNumber) => {
    const today = new Date().getTime();
    if (today < valueAsNumber) {
      this.isCredit = true;
      this.payDate = new Date(valueAsNumber);
    }
  };
  setAllProps({
    totalPrice,
    subTotal,
    tax,
    isCredit,
    client,
    payDate,
    details,
    taxReciept,
    discount,
    billNumer,
    createDate,
    _id,
  }) {
    details = _.map(details, (item) => {
      item.name = item.product.name 
      item.product = item.product._id;
      return item;
    });
    this._id = _id;
    this.totalPrice = totalPrice;
    this.subTotal = subTotal;
    this.tax = tax;
    this.isCredit = isCredit;
    this.client = client;
    this.payDate = payDate;
    this.details = details;
    this.taxReciept = taxReciept;
    this.discount = discount;
    this.billNumer = billNumer;
    this.createDate = createDate;
  }

  setdetails(product) {
    let data = product;
    data.quantity = 1;
    this.details.push(
      new RecieptDetailsModel({
        product: data._id,
        quantity: data.quantity,
        sellPrice: data.price,
        code: data.code,
      })
    );
    this.setprice();
  }

  setprice() {
    const price = _.toArray(_.mapValues(this.details, "sellPrice"));
    const quantity = _.toArray(_.mapValues(this.details, "quantity"));
    const total = _.zipWith(price, quantity, function(a, b) {
      return a * b;
    });
    this.totalPrice = _.sum(total);
    this.subTotal = this.totalPrice / 1.18;
    this.tax = this.totalPrice - this.subTotal;
  }

  removeDetails(data) {
    const index = _.findIndex(this.details, (x) => x.code === data.code, 0);
    this.details.splice(index, 1);
    this.setprice();
  }

  setclient = (data) => {
    this.client = new ClienModel(data);
  };

  settaxReciept(data) {
    data._id = this.taxReciept._id;
    this.taxReciept = new TaxRecieptModel(data);
  }

  save = async () => {
    this.taxReciept = _.pick(this.taxReciept, [
      "_id",
      "taxReciept",
      "type",
      "sequence",
      "isUsed",
    ]);
    if (!this._id) {
      return await service.saveBill(this);
    } else {
      return service.updateBill(this);
    }
  };

  get = async (id) => {
    const payload = await service.getBillById(id);
    this.setAllProps(payload.data);
    console.log(payload.data);

    return new Promise((resolve, reject) => resolve(true));
  };
}
