import Timed from "./abstracts/timed";

export default class Appointment extends Timed {
  static override getModel() {
    return "Appointment";
  }

  static override getTechnicalName() {
    return "appointment";
  }

  purpose: string = "";
}
