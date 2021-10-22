export default class RecieptDetailsModel {
    constructor({_id, price, quantity, code}) {
      this.code = code;
      this.product = _id;
      this.sellPrice = price;
      this.quantity = quantity;
    }
  }
  