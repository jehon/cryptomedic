import Patient from "../patient";
import Pojo, { StringDate } from "./pojo.js";

export default abstract class PatientRelated extends Pojo {
  patient_id: string = "";
  patient?: Patient;
  date: StringDate = "";
}
