import { ageWhen } from "../../../_helpers/date";
import { normalizeDate } from "../../../generic/date/date.component";
import { StringDate } from "../../../generic/io/io.component";
import Patient from "../patient";
import Pojo from "./pojo";

const PATIENT = Symbol("patient");

export default abstract class PatientRelated extends Pojo {
  patient_id: string = "";
  date: StringDate = ""; // required

  // Must be instanciated just after constructor
  [PATIENT]?: Patient;

  override isLocked(): boolean {
    if (new Date(this.date) > new Date()) {
      return false;
    }
    return super.isLocked();
  }

  override isTop(): boolean {
    return false;
  }

  setPatient(patient: Patient) {
    this[PATIENT] = patient;
  }

  getPatient(): Patient {
    if (!this[PATIENT]) {
      throw new Error(`Patient not defined on this ${this.uuid}`);
    }
    return this[PATIENT];
  }

  getAgeAtThatTime() {
    return ageWhen(
      normalizeDate(this.getPatient().year_of_birth),
      normalizeDate(this.date)
    );
  }
}
