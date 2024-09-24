import PatientRelated from "./abstracts/patient-related.js";

// Todo: Payment is not a patient related
export default class Payment extends PatientRelated {
  static getModel() {
    return "Payment";
  }

  static getTechnicalName() {
    return "payment";
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
}
