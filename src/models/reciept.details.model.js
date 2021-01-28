export default class RecieptDetailsModel {
    constructor({product, sellPrice, quantity, code}) {
      this.code = code;
      this.product = product;
      this.sellPrice = sellPrice;
      this.quantity = quantity;
    }
  }
  