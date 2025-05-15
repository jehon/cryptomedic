import { type StringDate } from "../../app-patient/objects";
import PatientRelated from "./patient-related";

export default class Timed extends PatientRelated {
  date: StringDate = "";
  examiner: string = "";
  center: string = "";
}
