import type Folder from "../folder";
import Pojo from "./pojo";

export default class PatientRelated extends Pojo {
  patient_id: string | undefined;

  registerParent(parent: Folder) {
    if (parent) {
      this.patient_id = parent.id;
    }
    return this;
  }
}
