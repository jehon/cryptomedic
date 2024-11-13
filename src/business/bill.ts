import { BillLine } from "../app-patient/blocs/io-bill-line";
import { DataMissingException } from "../utils/exceptions";
import { getSession } from "../utils/session";
import { string2number } from "../utils/strings";
import Timed from "./abstracts/timed";
import Payment from "./payment";
import Price from "./price";

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

  get items(): BillLine[] {
    const items = [];
    for (const [key, value] of Object.entries(this as Record<string, any>)) {
      if (this.getPriceFor(key) > 0) {
        const category = key.split("_")[0];
        if (Price.getCategories().includes(category)) {
          items.push({
            key,
            category,
            value: string2number(value),
            price: this.getPriceFor(key)
          } as BillLine);
        }
      }
    }
    return items;
  }

  ratioSalary() {
    if (!this.sl_number_of_household_members) {
      throw new DataMissingException("sl_number_of_household_members");
    }

    return Math.ceil(
      this.sl_family_salary / this.sl_number_of_household_members
    );
  }

  getPrice(): Price {
    if (!this.price_id) {
      // TODO: affine this
      throw new DataMissingException("Date is missing");
    }
    return getSession()?.prices?.[this.price_id] ?? null;
  }

  social_level_calculated() {
    /**
     From TC:
     Level 0 is when the familial ration is                            FR <= social_level_threshold_1
     Level 1 is when the familial ration is social_level_threshold_1 < FR <= social_level_threshold_2
     Level 2 is when the familial ration is social_level_threshold_2 < FR <= social_level_threshold_3
     Level 3 is when the familial ration is social_level_threshold_3 < FR <= social_level_threshold_4
     Level 4 is when the familial ration is social_level_threshold_4 < FR
     */

    if (this.getPrice()) {
      try {
        const rs = this.ratioSalary();

        if (rs <= this.getPrice().social_level_threshold_1) {
          return 0;
        }

        if (rs <= this.getPrice().social_level_threshold_2) {
          return 1;
        }

        if (rs <= this.getPrice().social_level_threshold_3) {
          return 2;
        }

        if (rs <= this.getPrice().social_level_threshold_4) {
          return 3;
        }
      } catch (_e) {
        // expected
      }
    }

    // Default
    return 4;
  }

  get_percentage_asked(): number {
    if (!this.getPrice()) {
      //console.warn('calculate_percentage_asked(): no price id');
      return 1;
    }
    const sl = this["social_level"];
    if (sl == null) {
      //console.warn('calculate_percentage_asked(): no social level');
      return 1;
    }
    if (
      typeof this.getPrice()["social_level_percentage_" + sl] == "undefined"
    ) {
      //console.warn('calculate_percentage_asked(): no social level in price for sl ' + sl);
      return 1;
    }
    const perc = this.getPrice()["social_level_percentage_" + sl];
    // console.log("price", this.getPrice(), sl, perc)
    return perc;
  }

  getPriceFor(key: string): number {
    if (!this.getPrice()) return 0;
    if (!this.getPrice()[key]) return 0;
    return this.getPrice()[key];
  }

  getTotalAlreadyPaid() {
    return this.getPayments().reduce(
      (acc: number, payment: Payment) => acc + payment.amount,
      0
    );
  }

  getPayments(): Payment[] {
    return this.getParent!().getFilesRelatedToBill(this.getId());
  }

  // calculatePriceId() {
  //   const prices = this.getPricesList();
  //   if (typeof this.date == "undefined" || !this.date || !prices) {
  //     this.price_id = "0";
  //     return;
  //   }
  //   this.price_id = "";
  //   for (const i in prices) {
  //     const p = prices[i];
  //     if (
  //       (p["date_from"] == null || p["date_from"] <= this.date) &&
  //       (p["date_to"] == null || p["date_to"] > this.date)
  //     ) {
  //       this.price_id = i;
  //     }
  //   }
  //   if (this.price_id == "") {
  //     throw new Error("Price Id not set");
  //   }
  //   this.calculate_total_real();
  // }

  // // Legacy
  // getPriceId() {
  //   return this.price_id;
  // }

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
