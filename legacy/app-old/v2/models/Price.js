/* istanbul ignore file */

import CRUD from "../../../../src/utils/crud.js";

export default class Price extends CRUD {
  static getBaseUrl() {
    return "admin/prices";
  }
}
