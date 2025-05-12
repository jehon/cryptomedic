import type { BusinessType } from "../config";
import { type StringList } from "../utils/types";
import Timed from "./abstracts/timed";

// Timed is too wide, we don't use Examiner and Center
export default class Picture extends Timed {
  static override getTechnicalName(): BusinessType {
    return "picture";
  }

  type: StringList = "";
  file: string = "";
  comments: string = "";
}
