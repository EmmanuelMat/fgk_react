export default class ClienModel {
  constructor({_id, name, taxId, pNumber, cNumber, address}) {
    this._id = _id;
    this.name = name;
    this.taxId = taxId;
    this.pNumber = pNumber;
    this.cNumber = cNumber;
    this.address = address;
  }
}
