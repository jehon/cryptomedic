import Timed from "./abstracts/timed.js";
import { registrySet } from "./registry.js";

const model = "Surgery";

export default class Surgery extends Timed {
  static getModel() {
    return model;
  }

  getModel() {
    return model;
  }

  getTechnicalName() {
    return "surgery";
  }

  // Legacy
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

  constructor(
    {
      date,
      report_diagnostic,
      report_surgeon,
      report_side_right,
      report_side_left,
      report_procedure,
      follow_up_complication,
      ...others
    } = {},
    folder = null
  ) {
    super(others, folder);
    this.date = date;
    this.report_diagnostic = report_diagnostic;
    this.report_surgeon = report_surgeon;
    this.report_side_right = report_side_right;
    this.report_side_left = report_side_left;
    this.report_procedure = report_procedure;
    this.follow_up_complication = follow_up_complication;
  }

  // Legacy
  validate(res) {
    res = super.validate(res);

    if (this.date > new Date().toISOString()) {
      res.dateInTheFuture = true;
    }
    return res;
  }
}

registrySet(model, Surgery);
