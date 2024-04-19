import constants from "../../generic/constants";
import { StringList, StringText } from "../../generic/io/io.component";
import PatientRelated from "./abstracts/patient-related";

export default class Appointment extends PatientRelated {
  override getTechnicalName(): string {
    return constants.models["appointment"].name;
  }

  override getTitle(): string {
    return `appointment of ${this.date} at ${this.center}`;
  }

  center: StringList = "";
  examiner: StringList = ""; // TODO: used or not?
  purpose: StringText = "";
}
