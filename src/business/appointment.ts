import Timed from "./abstracts/timed.js";

export default class Appointment extends Timed {
  static override getModel() {
    return "Appointment";
  }

  static override getTechnicalName() {
    return "appointment";
  }

  purpose: string = "";

  override isLocked() {
    return false;
  }
}
