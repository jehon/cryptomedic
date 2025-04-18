import { Type } from "class-transformer";
import "reflect-metadata"; // Required by class-transformer
import Timed from "./abstracts/timed";
import Payment from "./payment";

export default class Bill extends Timed {
  static override getModel() {
    return "Bill";
  }

  static override getTechnicalName() {
    return "bill";
  }

  price_id: string = "";
  sl_family_salary: number = 0;
  sl_number_of_household_members: number = 0; // TODO: Max 10
  total_real: number = 0;
  social_level: number = 0;
  total_asked: number = 0;

  // !! This map to getTechnicalName() !!
  @Type(() => Payment)
  payment: Payment[] = [];

  getPayments(): Payment[] {
    // TODO: use payments field
    if (!this.getId()) {
      return [];
    }

    return this.getParent!().getFilesRelatedToBill(this.getId());
  }

  // // Legacy
  // validate(res) {
  //   /* Business rules (price > 4):
  //       - il faut pourvoir coder home visit ou give appointment mais pas les 2
  //       - il faut pourvoir coder consultation physio ou doctor mais pas les 2
  //       */
  //   res = super.validate(res);

  //   if (!this.date) {
  //     res.noDate = true;
  //   }

  //   if (this.date > new Date().toISOString()) {
  //     res.dateInTheFuture = true;
  //   }

  //   if (this.price_id >= 2) {
  //     if (this.consult_home_visit > 0 && this.consult_give_appointment > 0) {
  //       res.homeVisitAndGiveAppointment = true;
  //     }

  //     if (
  //       this.consult_CDC_consultation_physio > 0 &&
  //       this.consult_CDC_consultation_Doctor > 0
  //     ) {
  //       res.consultPhisioAndDoctor = true;
  //     }
  //   }
  //   return res;
  // }
}
