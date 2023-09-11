import { getPref } from "../../utils/prefs.js";
import Pojo from "./pojo.js";

export default class PatientRelated extends Pojo {
  /** @type {number} */
  patient_id;

  /**
   *
   * @param {patient_id?}
   */
  constructor({ patient_id, ...others } = {}, folder = null) {
    super(others);
    this.patient_id = patient_id;
    this.getFolder = () => folder;
    if (this.getFolder()) {
      this.patient_id = folder.getId();
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

  /**
   * @returns {Patient|null}
   */
  getPatient() {
    return this.getFolder().getPatient();
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
