import Pojo from "./pojo.js";

export default class PatientRelated extends Pojo {
  /** @type {number} */
  patient_id;

  registerParent(parent) {
    /** @type {(): Folder} */
    this.getFolder = () => parent;
    if (this.getFolder()) {
      this.patient_id = parent.getId();
    }
    return this;
  }

  getParent() {
    return this.getFolder();
  }

  // Legacy
  /**
   * @returns {Patient}
   */
  getPatient() {
    return this.getFolder().getPatient();
  }

  // Legacy
  isLocked() {
    if (!this.updated_at) {
      return false;
    }
    var dlock = new Date(this.updated_at);
    dlock.setDate(dlock.getDate() + 35);
    return dlock < new Date();
  }

  getParentField() {
    return "patient_id";
  }

  getParentId() {
    return this.patient_id;
  }
}
