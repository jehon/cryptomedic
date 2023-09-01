import FolderPage from "./folder-page.js";
import { DataMissingException } from "../../utils/exceptions.js";
import { fromBirthDateTo, normalizeDate } from "../../utils/date-old.js";

export default class PatientRelated extends FolderPage {
  /** @type {Patient|null} */
  #patient;

  /** @type {number} */
  patient_id;

  constructor({ patient_id, ...others } = {}, folder = null) {
    super(others);
    this.patient_id = patient_id;
    if (folder) {
      this.patient_id = folder.getId();
      this.linkPatient(folder.getPatient());
    } else {
      this.linkPatient(null);
    }
  }

  linkPatient(patient) {
    this.#patient = patient;
    if (patient) {
      this.patient_id = patient.id;
    }
  }

  /**
   * @returns {Patient|null}
   */
  getPatient() {
    return this.#patient;
  }

  getAgeAtThatTime() {
    return fromBirthDateTo(
      normalizeDate(this.getPatient().year_of_birth),
      normalizeDate(this.date)
    );
  }

  wh() {
    if (!this.isNotZero("height_cm")) {
      throw new DataMissingException("Height");
    }
    if (!this.isNotZero("weight_kg")) {
      throw new DataMissingException("Weight");
    }
    return this.weight_kg / this.height_cm;
  }

  bmi() {
    if (!this.isNotZero("height_cm")) {
      throw new DataMissingException("Height");
    }
    if (!this.isNotZero("weight_kg")) {
      throw new DataMissingException("Weight");
    }
    return (10000 * this.weight_kg) / (this.height_cm * this.height_cm);
  }

  isLocked() {
    if (!this.updated_at) {
      return false;
    }
    var dlock = new Date(this.updated_at);
    dlock.setDate(dlock.getDate() + 35);
    return dlock < new Date();
  }
}
