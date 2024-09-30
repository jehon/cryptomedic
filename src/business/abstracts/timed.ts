import { StringDate } from "../../utils/types.js";
import PatientRelated from "./patient-related";

export default class Timed extends PatientRelated {
  static override getModel() {
    return "Timed";
  }

  date: StringDate = "";
  examiner: string = "";
  center: string = "";
}
