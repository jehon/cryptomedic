import { type StringDate } from "../../utils/types";
import PatientRelated from "./patient-related";

export default class Timed extends PatientRelated {
  date: StringDate = "";
  examiner: string = "";
  center: string = "";
}
