import { type StringBoolean } from "../app-patient/objects";
import Timed from "./abstracts/timed";

export default class Surgery extends Timed {
  report_diagnostic: string = "";
  report_surgeon: string = "";
  report_side_right: StringBoolean = "0";
  report_side_left: StringBoolean = "0";
  report_procedure: string = "";
  follow_up_complication: string = "";
}
