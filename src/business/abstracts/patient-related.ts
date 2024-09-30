import Folder from "../folder";
import Pojo from "./pojo";

export default class PatientRelated extends Pojo {
  patient_id: string = "";
  #parent?: Folder;

  registerParent(parent: Folder) {
    this.#parent = parent;
    if (parent) {
      this.patient_id = parent.getId();
    }
    return this;
  }

  getParent(): Folder {
    return this.#parent!;
  }

  // Legacy
  /**
   * @returns {Patient}
   */
  getPatient() {
    return this.getParent().getPatient();
  }

  override isLocked(): boolean {
    if (!this.updated_at) {
      return false;
    }
    const dlock = new Date(this.updated_at);
    dlock.setDate(dlock.getDate() + 35);
    return dlock < new Date();
  }

  override getParentField(): string {
    return "patient_id";
  }

  override getParentId(): string {
    return this.patient_id;
  }
}
