import _helpers from "../../../helpers/_helpers";
import TaxRecieptGovModel from "../../../../models/tax.reciept.gov.model";


export default class TaxRecipt {
  constructor({ sequence, taxReciept }) {
    this.createDate = new Date();
    this.isUsed = true;
    this.sequence = sequence;
    this.taxReciept = taxReciept;
    this.trg = new TaxRecieptGovModel(taxReciept);
  }

  createNewTaxRecipt() {
    let sequence = parseInt(this.sequence) + 1;
    sequence = this.pad(sequence.toString(), 7)
    return {
      _id: this.taxReciept.Id,
      taxRecieptId: _helpers.genTaxtReciept(this.trg, sequence),
      sequence,
      isUsed: this.isUsed,
      taxReciept: this.taxReciept._id
    };
  }

  pad(n, width, z) {
    z = z || "0";
    n = n + "";
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }
}
