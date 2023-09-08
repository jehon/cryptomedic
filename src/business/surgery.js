import Timed from "./timed.js";

export default class Surgery extends Timed {
  getModel() {
    return "Surgery";
  }

  getServerRessource() {
    return "surgeries";
  }

  date;
  report_diagnostic;
  report_surgeon;
  report_side_right;
  report_side_left;
  report_procedure;
  follow_up_complication;

  constructor({
    date,
    report_diagnostic,
    report_surgeon,
    report_side_right,
    report_side_left,
    report_procedure,
    follow_up_complication,
    ...others
  } = {}) {
    super(others);
    this.date = date;
    this.report_diagnostic = report_diagnostic;
    this.report_surgeon = report_surgeon;
    this.report_side_right = report_side_right;
    this.report_side_left = report_side_left;
    this.report_procedure = report_procedure;
    this.follow_up_complication = follow_up_complication;
  }

  validate(res) {
    res = super.validate(res);

    if (this.date > new Date().toISOString()) {
      res.dateInTheFuture = true;
    }
    return res;
  }
}
