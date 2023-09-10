import Pojo from "./pojo.js";

export default class Price extends Pojo {
  getModel() {
    return "Price";
  }

  static getBaseUrl() {
    return "admin/prices";
  }

  static getCategories() {
    return ["consult", "medecine", "other", "workshop", "surgical"];
  }
}
