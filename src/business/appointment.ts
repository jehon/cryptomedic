import { StringDate, StringList } from "../utils/types.js";
import PatientRelated from "./abstracts/patient-related.js";
import { registrySet } from "./registry.js";

const model = "Appointment";

export default class Appointment extends PatientRelated {
  static override getModel() {
    return model;
  }

  static override getTechnicalName() {
    return "appointment";
  }

  // We could not inherit from Timed because Timed implies a date in the past

  examiner: StringList = "";
  purpose: string = "";
  date: StringDate = "";
  center: StringList = "";

  /**
   *
   * @param {examiner?}
   * @param {Folder} folder?
   */
  constructor(
    {
      examiner,
      purpose,
      date,
      center,
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
    this.examiner = examiner || "";
    this.purpose = purpose || "";
    this.date = date || "";
    this.center = center || "";
  }

  override isLocked() {
    return false;
  }
}

registrySet(model, Appointment);
