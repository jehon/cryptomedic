import Timed from "./abstracts/timed.js";
import { registrySet } from "./registry.js";

const model = "Appointment";

export default class Appointment extends Timed {
  static override getModel() {
    return model;
  }

  static override getTechnicalName() {
    return "appointment";
  }

  // We could not inherit from Timed because Timed implies a date in the past

  purpose: string = "";

  /**
   *
   * @param {examiner?}
   * @param {Folder} folder?
   */
  constructor(
    {
      purpose,
      ...others
    }: {
      examiner?: string;
      purpose?: string;
      date?: string;
      center?: string;
      [key: string]: string | undefined;
    } = {},
    folder = null
  ) {
    super(others, folder);
    this.purpose = purpose || "";
  }

  override isLocked() {
    return false;
  }
}

registrySet(model, Appointment);
