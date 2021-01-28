import ClienModel from "../../../../models/client.model";
import RecieptDetailsModel from "../../../../models/reciept.details.model";
import TaxRecieptModel from "../../../../models/tax.reciept.model";
import _ from "lodash";
import _helpers from "../../../helpers/_helpers";
import service from "../service";
export default class Bill {
  totalPrice = 0;
  subTotal = 0;
  tax = 0;
  isCredit = false;
  client;
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
    console.log(this.isCredit, this.payDate);
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
  }) {
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
    console.log(data);
    this.client = new ClienModel(data);
  };

  settaxReciept(data) {
    this.taxReciept = new TaxRecieptModel(data);
  }

  save = async () => {
    this.taxReciept = _.pick(this.taxReciept, [
      "taxReciept",
      "type",
      "sequence",
      "isUsed",
    ]);
    return await service.saveBill(this);
  };

  get = async (id) => {
    const payload = await service.getBillById(id);
    this.setAllProps(payload.data);
    return new Promise((resolve, reject) => resolve(true));
  };
}




/**{"totalPrice": 5000,
"subTotal": 4366,
"tax": 799,
"isCredit": false,
"client": {"_id": "5ffbacb46dd4c30eabd2ca1a"},
"payDate": "Wed Jan 13 2021 10:30:21 GMT-0400 (Atlantic Standard Time)",
"taxReciept": {
      "taxReciept": "5ffb47828f1bc6e77a8791ba",
      "isUsed": true,
      "sequence": "0000001"

  },
"details": [
  {
    "product": "5ff3d9dfd93e2be06cd46676",
    "sellPrice": 35, 
    "quantity": 150
  }, 
  {
    "product": "5ff3d7f5a7e1a2de62436208",
    "sellPrice": 25, 
    "quantity": 100
  }
  
]}**/
