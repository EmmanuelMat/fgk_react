export class RecipeModel {
  constructor(
    taxReciept,
    totalPrice,
    subTotal,
    tax,
    isCredit,
    payDate,
    client,
    details
  ) {
    this.taxReciept = taxReciept;
    this.totalPrice = totalPrice;
    this.subTotal = subTotal;
    this.tax = tax;
    this.isCredit = isCredit;
    this.payDate = payDate;
    this.client = client;
    this.details = details;
  }
}

module.exports = RecipeModel;