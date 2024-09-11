/* istanbul ignore file */

import {
  ConfigurationMissingException,
  DataMissingException
} from "../../../../src/utils/exceptions.js";
import { getSession, onSession } from "../../../../src/utils/session.js";
import XFile from "./x-file.js";

export default class XFileBill extends XFile {
  get categoriesList() {
    return ["consult", "medecine", "workshop", "surgical", "other"];
  }

  label(key) {
    let p1 = key.indexOf("_");
    if (p1 > 0) {
      return key
        .substring(p1 + 1)
        .split("_")
        .join(" ");
    }
    return key;
  }

  constructor() {
    super();
    onSession(() => this.adapt());
    this.calculatePrice();
  }

  adapt() {
    super.adapt();
    this.calculatePrice();
    this.innerHTML = "bill available: " + JSON.stringify(this.value);
  }

  calculatePrice() {
    try {
      const definitions = getSession();
      if (!definitions || !("prices" in definitions)) {
        throw ConfigurationMissingException("Prices");
      }
      const prices = definitions.prices;
      if (!prices || prices.length < 1) {
        throw new DataMissingException("prices");
      }

      // Should be in string for comparisons to works...
      const dref = this.assertExists("date");

      let index = -1;
      for (const i in prices) {
        const p = prices[i];
        if (
          (p["date_from"] == null || p["date_from"] <= dref) &&
          (p["date_to"] == null || p["date_to"] > dref)
        ) {
          index = i;
        }
      }
      if (index < 0) {
        throw new Error("Price id not found");
      }
      this.price = prices[index];
    } catch (_e) {
      this.price = false;
    }
    return this.price;
  }

  getFieldsBelongingTo(category) {
    if (!this.price) {
      return [];
    }
    const res = [];
    for (const key in this.price) {
      if (key.substr(0, category.length + 1) == category + "_") {
        res.push(key);
      }
    }
    return res;
  }
}

window.customElements.define("x-file-bill", XFileBill);
