import { getPref } from "../utils/prefs.js";
import FolderPage from "./folder-page.js";

export default class PatientRelated extends FolderPage {
  /** @type {Patient|null} */
  #patient;

  /** @type {number} */
  patient_id;

  /** @type {folder} */
  #folder;

  /**
   *
   * @param {patient_id?}
   */
  constructor({ patient_id, ...others } = {}, folder = null) {
    super(others);
    this.patient_id = patient_id;
    this.#folder = folder;
    if (this.getFolder()) {
      this.patient_id = folder.getId();
      this.linkPatient(folder.getPatient());
    } else {
      this.linkPatient(null);
    }
  }

  initFromCachedPreferences() {
    var c = getPref("file", {
      examiner: "",
      center: "",
      date: ""
    });
    this.examiner = c.examiner;
    this.center = c.center;
    this.date = c.date;
  }

  linkPatient(patient) {
    this.#patient = patient;
    if (patient) {
      this.patient_id = patient.id;
    }
  }

  getFolder() {
    return this.#folder;
  }

  /**
   * @returns {Patient|null}
   */
  getPatient() {
    return this.#patient;
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
