/* istanbul ignore file */

import CRUD from "../../../../src/app-folder/business/crud.js";

export default class Price extends CRUD {
  static getBaseUrl() {
    return "admin/prices";
  }
}
