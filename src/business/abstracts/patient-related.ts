import type Folder from "../folder";
import Pojo from "./pojo";

export default class PatientRelated extends Pojo {
  patient_id: string | undefined;
  #parent?: Folder;

  registerParent(parent: Folder) {
    this.#parent = parent;
    if (parent) {
      this.patient_id = parent.id;
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

  override getParentField(): string {
    return "patient_id";
  }

  override getParentId(): string | undefined {
    return this.patient_id;
  }
}
