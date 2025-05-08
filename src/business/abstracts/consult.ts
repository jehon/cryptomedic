import Timed from "./timed";

import {
  type StringBoolean,
  type StringList,
  type StringNumber
} from "../../utils/types";

export default class Consult extends Timed {
  // Begin
  weight_kg: StringNumber = "";
  height_cm: StringNumber = "";
  brachial_circumference_cm: StringNumber = "";
  // End
  comments: string = "";
  suggested_for_surgery: StringBoolean = "";
  treatment_evaluation: StringList = "";
  treatment_finished: StringBoolean = "";
}
