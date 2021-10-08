import RecieptDetailsModel from "../../../models/reciept.details.model";
import TaxRecieptModel from "../../../models/tax.reciept.model";

export const billObject = {
  createDate: new Date(),
  payDate: new Date(),
  totalPrice: 0,
  subTotal: 0,
  tax: 0,
  isCredit: false,
  client: {}, //done
  details: [],
  discount: 0,
  taxReciept: new TaxRecieptModel("", "", true, ""), //done
  billNumer: 0,
  notes: "",
  amountPaid: 0,
};

export const _setTaxReciept = (data, sequense) => {
  let taxReciept = new TaxRecieptModel(data);
  taxReciept.taxRecieptId = sequense;
  taxReciept.taxReciept = taxReciept.taxReciept._id;
  return taxReciept;
};

export const _setDetails = (data) => {
  if (!data._id) return;
  return new RecieptDetailsModel({
    product: data._id,
    quantity: data.quantity,
    sellPrice: data.price,
    code: data.code,
  });
};
