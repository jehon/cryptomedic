import Folder from "../folder";
import Pojo from "./pojo";

export default class PatientRelated extends Pojo {
  patient_id: string | undefined;
  #parent?: Folder;

  registerParent(parent: Folder) {
    this.#parent = parent;
    if (parent) {
      this.patient_id = parent.getId();
    }
    return this;
  }

  // Legacy
  /**
   * @returns {Patient}
   */
  getPatient() {
    return this.#parent!.getPatient();
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

  override getParentId(): string | undefined {
    return this.patient_id;
  }
}
