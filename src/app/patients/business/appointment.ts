import { StringList, StringText } from "../../generic/io/io.component";
import PatientRelated from "./abstracts/patient-related";

export default class Appointment extends PatientRelated {
  override getTechnicalName(): string {
    return "appointment";
  }

  center: StringList = "";
  examiner: StringList = ""; // TODO: used or not?
  purpose: StringText = "";
}
