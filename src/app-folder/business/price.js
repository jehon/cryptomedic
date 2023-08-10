import CRUD from "./crud.js";

export default class Price extends CRUD {
  static getBaseUrl() {
    return "admin/prices";
  }
}
