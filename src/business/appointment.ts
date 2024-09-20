import Timed from "./abstracts/timed.js";

const model = "Appointment";

export default class Appointment extends Timed {
  static override getModel() {
    return model;
  }

  static override getTechnicalName() {
    return "appointment";
  }

  purpose: string = "";

  override isLocked() {
    return false;
  }
}
