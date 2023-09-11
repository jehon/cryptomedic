import Pojo from "./abstracts/pojo.js";

export default class Payment extends Pojo {
  getModel() {
    return "Payment";
  }

  bill_id;
  date;
  amount;
  comments;

  // We don't use the "center" from the Timed object

  constructor(
    { bill_id, date, amount, comments, ...others } = {},
    folder = null
  ) {
    super(others, folder);
    this.bill_id = bill_id;
    this.date = date;
    this.amount = amount;
    this.comments = comments;
  }

  getRelatedBill() {
    return this.getFolder().getByUid("Bo;;Bill-" + this.bill_id);
  }
}
