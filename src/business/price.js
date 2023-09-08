import CRUD from "./crud.js";

export default class Price extends CRUD {
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
