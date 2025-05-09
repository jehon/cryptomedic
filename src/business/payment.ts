import { type StringDate } from "../utils/types";
import PatientRelated from "./abstracts/patient-related";

// Todo: Payment is not a patient related
export default class Payment extends PatientRelated {
  static override getTechnicalName() {
    return "payment";
  }

  bill_id: string = "";
  date: StringDate = "";
  amount: number = 0;
  comments: string = "";

  // Note: We don't use the "center" from the Timed object
}
