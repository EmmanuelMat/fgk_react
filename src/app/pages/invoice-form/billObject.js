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

export const pad = (n, width, z) => {
  z = z || "0";
  n = n + "";
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

export const _setTaxReciept = (data, sequense) => {
  data.sequence = pad(data.sequence, 8)
  let taxReciept = new TaxRecieptModel(data);
  taxReciept.taxRecieptId = sequense
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
