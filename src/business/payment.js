import Timed from "./timed.js";

export default class Payment extends Timed {
  getModel() {
    return "Payment";
  }

  bill_id;
  amount;
  comments;

  // We don't use the "center" from the Timed object

  constructor({ bill_id, amount, comments, ...others } = {}) {
    super(others);
    this.bill_id = bill_id;
    this.amount = amount;
    this.comments = comments;
  }
}
