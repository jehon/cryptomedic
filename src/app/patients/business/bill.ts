import { Type } from "class-transformer";
import constants from "../../generic/constants";
import PatientRelated from "./abstracts/patient-related";
import Payment from "./payment";

export default class Bill extends PatientRelated {
  override getTechnicalName() {
    return constants.models["bill"].name;
  }

  price_id: string = "";
  center?: string = "";
  examiner?: string = "";

  social_level: number = 0;
  sl_family_salary: number = 0;
  sl_number_of_household_members: number = 0;
  total_real: number = 0;
  total_asked: number = 0;
  // We can not be more precise because
  // if not any, other fields will conflict
  [x: string]: any;

  @Type(() => Payment)
  payment: Payment[] = [];

  getPaid() {
    return this.payment.reduce((acc, payment) => acc + payment.amount, 0);
  }
}
