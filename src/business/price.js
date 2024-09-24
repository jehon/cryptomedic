import Pojo from "./abstracts/pojo.js";

export default class Price extends Pojo {
  static getModel() {
    return "Price";
  }

  static getTechnicalName() {
    return "price";
  }

  // Legacy
  static getBaseUrl() {
    return "admin/prices";
  }

  static getCategories() {
    return ["consult", "medecine", "other", "workshop", "surgical"];
  }
}
