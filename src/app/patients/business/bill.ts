import constants from "../../generic/constants";
import PatientRelated from "./abstracts/patient-related";

export default class Bill extends PatientRelated {
  override getTechnicalName() {
    return constants.models["bill"].name;
  }

  price_id: string = "";
  sl_family_salary: number = 0;
  sl_number_of_household_members: number = 0;
  total_real: number = 0;
  social_level: number = 0;
  total_asked: number = 0;
  items: number = 0;
}
