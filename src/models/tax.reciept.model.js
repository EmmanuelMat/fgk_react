export default class TaxRecieptModel {
  constructor({ _id, taxRecieptId, taxReciept, isUsed, sequence }) {
    this._id = _id;
    this.taxRecieptId = taxRecieptId;
    this.taxReciept = taxReciept;
    this.isUsed = isUsed;
    this.sequence = sequence;
  }
}
