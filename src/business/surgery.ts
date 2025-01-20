import { type StringBoolean } from "../utils/types";
import Timed from "./abstracts/timed";

export default class Surgery extends Timed {
  static override getModel() {
    return "Surgery";
  }

  static override getTechnicalName() {
    return "surgery";
  }

  report_diagnostic: string = "";
  report_surgeon: string = "";
  report_side_right: StringBoolean = "0";
  report_side_left: StringBoolean = "0";
  report_procedure: string = "";
  follow_up_complication: string = "";
}
