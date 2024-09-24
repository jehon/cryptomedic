import { DataMissingException } from "../exceptions.js";
import Timed from "./abstracts/timed.js";
import Price from "./price.js";
import { registrySet } from "./registry.js";

const model = "Bill";

export default class Bill extends Timed {
  static getModel() {
    return model;
  }

  getModel() {
    return model;
  }

  getTechnicalName() {
    return "bill";
  }

  getRelated() {
    return {
      Payment: "bill_id"
    };
  }

  price_id;
  sl_family_salary;
  sl_number_of_household_members;
  total_real;
  social_level;
  total_asked;
  items;

  /**
   *
   * @param {price_id} price_id
   * @param {*} folder
   */
  constructor(
    {
      price_id,
      sl_family_salary,
      sl_number_of_household_members,
      total_real,
      social_level,
      total_asked,
      items,
      ...others
    } = {},
    folder = null
  ) {
    super(others, folder);
    this.price_id = price_id;
    this.sl_family_salary = sl_family_salary;
    this.sl_number_of_household_members = sl_number_of_household_members;
    this.total_real = total_real;
    this.social_level = social_level;
    this.total_asked = total_asked;
    this.items = items;

    if (!this.id) {
      // Initialize social level from last bill (if any)
      var last_bill = null;
      if (this.getFolder()) {
        for (var v of folder.getListByType(Bill)) {
          if (!last_bill) {
            last_bill = v;
          } else {
            if (last_bill.date < v.date) {
              last_bill = v;
            }
          }
        }
        if (last_bill) {
          this.sl_family_salary = last_bill.sl_family_salary;
          this.sl_number_of_household_members =
            last_bill.sl_number_of_household_members;
        }
      }
    }

    // Build up the current items'list
    this.items = [];
    for (const key of Object.keys(others)) {
      if (others[key] > 0) {
        const category = key.split("_")[0];
        if (Price.getCategories().includes(category)) {
          this.items.push({ key, category, value: others[key] });
        }
      }
    }
  }

  getTotalForCategory(category) {
    return this.items
      .filter((item) => item.category === category)
      .reduce((item) => item.value * this.getPriceFor(item.key), 0);
  }

  ratioSalary() {
    if (!this.isNotZero("sl_number_of_household_members")) {
      throw new DataMissingException("sl_number_of_household_members");
    }

    return Math.ceil(
      this.sl_family_salary / this.sl_number_of_household_members
    );
  }

  // Legacy
  social_level_calculated() {
    /**
     From TC:
     Level 0 is when the familial ration is                            FR <= social_level_threshold_1
     Level 1 is when the familial ration is social_level_threshold_1 < FR <= social_level_threshold_2
     Level 2 is when the familial ration is social_level_threshold_2 < FR <= social_level_threshold_3
     Level 3 is when the familial ration is social_level_threshold_3 < FR <= social_level_threshold_4
     Level 4 is when the familial ration is social_level_threshold_4 < FR
     */

    if (this.price) {
      try {
        const rs = this.ratioSalary();

        if (rs <= this.price.social_level_threshold_1) {
          return 0;
        }

        if (rs <= this.price.social_level_threshold_2) {
          return 1;
        }

        if (rs <= this.price.social_level_threshold_3) {
          return 2;
        }

        if (rs <= this.price.social_level_threshold_4) {
          return 3;
        }
      } catch (_e) {
        // expected
      }
    }

    // Default
    return 4;
  }

  // Legacy
  calculate_total_real() {
    if (!this.price) {
      this.total_real = 0;
      this.total_asked = 0;
      return -1;
    }
    var total = 0;
    for (var i in this.price) {
      if (i[0] === "_") {
        continue;
      }
      if (i === "id") {
        continue;
      }
      if (i === "created_at") {
        continue;
      }
      if (i === "updated_at") {
        continue;
      }
      if (i === "last_user") {
        continue;
      }
      if (i === "date_from") {
        continue;
      }
      if (i === "date_to") {
        continue;
      }
      if (i === "controller") {
        continue;
      }
      if (i === "locked") {
        continue;
      }
      if (i === "dlocked") {
        continue;
      }
      if (i.startsWith("social_level_")) {
        continue;
      }
      if (this.price[i] < 0) {
        continue;
      }
      if (typeof this[i] === "undefined") {
        continue;
      }
      if (this[i] <= 0) {
        continue;
      }
      total += this.price[i] * this[i];
    } //, this);
    this.total_real = total;
    this.total_asked = this.total_real * this.calculate_percentage_asked();
    return this.total_real;
  }

  // Legacy
  calculate_percentage_asked() {
    if (!this.price) {
      //console.warn('calculate_percentage_asked(): no price id');
      return 1;
    }
    var sl = this["social_level"];
    if (sl == null) {
      //console.warn('calculate_percentage_asked(): no social level');
      return 1;
    }
    if (typeof this.price["social_level_percentage_" + sl] == "undefined") {
      //console.warn('calculate_percentage_asked(): no social level in price for sl ' + sl);
      return 1;
    }
    var perc = this.price["social_level_percentage_" + sl];
    // console.log("price", this.price, sl, perc)
    return perc;
  }

  // Legacy
  getPriceFor(key) {
    if (!this.price) return 0;
    if (!this.price[key]) return 0;
    return this.price[key];
  }

  // Legacy
  getTotalFor(key) {
    if (!this.price) return 0;
    if (!this.price[key]) return 0;
    if (!this[key]) return 0;
    return this.price[key] * this[key];
  }

  getTotalAlreadyPaid() {
    return this.getPayments().reduce((acc, payment) => acc + payment.amount, 0);
  }

  getPayments() {
    return this.getFolder().getFilesRelatedToBill(this.getId());
  }

  // Legacy
  calculatePriceId(prices) {
    if (typeof this.date == "undefined" || !this.date || !prices) {
      this.price_id = 0;
      this.price = false;
      return 0;
    }
    this.price_id = -1;
    for (var i in prices) {
      var p = prices[i];
      if (
        (p["date_from"] == null || p["date_from"] <= this.date) &&
        (p["date_to"] == null || p["date_to"] > this.date)
      ) {
        this.price_id = i;
        this.price = prices[i];
      }
    }
    if (this.price_id < 0) {
      throw new Error("Price Id not set");
    }
    this.calculate_total_real();
  }

  // Legacy
  getPriceId() {
    return this.price_id;
  }

  // Legacy
  validate(res) {
    /* Business rules (price > 4):
        - il faut pourvoir coder home visit ou give appointment mais pas les 2
        - il faut pourvoir coder consultation physio ou doctor mais pas les 2
        */
    res = super.validate(res);

    if (!this.date) {
      res.noDate = true;
    }

    if (this.date > new Date().toISOString()) {
      res.dateInTheFuture = true;
    }

    if (this.price_id >= 2) {
      if (this.consult_home_visit > 0 && this.consult_give_appointment > 0) {
        res.homeVisitAndGiveAppointment = true;
      }

      if (
        this.consult_CDC_consultation_physio > 0 &&
        this.consult_CDC_consultation_Doctor > 0
      ) {
        res.consultPhisioAndDoctor = true;
      }
    }
    return res;
  }
}

registrySet(model, Bill);
