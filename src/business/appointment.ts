import type { BusinessType } from "../config";
import Timed from "./abstracts/timed";

export default class Appointment extends Timed {
  static override getTechnicalName(): BusinessType {
    return "appointment";
  }

  purpose: string = "";
}
