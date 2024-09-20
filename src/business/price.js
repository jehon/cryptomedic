import Pojo from "./abstracts/pojo.js";

const model = "Price";

export default class Price extends Pojo {
  static getModel() {
    return model;
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
