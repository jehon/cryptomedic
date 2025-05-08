import { type StringList } from "../utils/types";
import Timed from "./abstracts/timed";

// Timed is too wide, we don't use Examiner and Center
export default class Picture extends Timed {
  static override getModel() {
    return "Picture";
  }

  static override getTechnicalName() {
    return "picture";
  }

  type: StringList = "";
  file: string = "";
  comments: string = "";
}
