import { StringDate } from "../../../generic/io/io.component";
import Patient from "../patient";
import Pojo from "./pojo";

export default abstract class PatientRelated extends Pojo {
  patient_id: string = "";
  patient?: Patient;
  date: StringDate = ""; // required

  override isLocked(): boolean {
    if (new Date(this.date) > new Date()) {
      return false;
    }
    return super.isLocked();
  }
}
