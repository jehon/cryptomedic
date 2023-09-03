import FolderPage from "./folder-page.js";

export default class Payment extends FolderPage {
  getModel() {
    return "Payment";
  }

  bill_id;
  date;
  examiner;
  amount;
  comments;

  constructor({ bill_id, date, examiner, amount, comments, ...others } = {}) {
    super(others);
    this.bill_id = bill_id;
    this.date = date;
    this.examiner = examiner;
    this.amount = amount;
    this.comments = comments;
  }
}
