/* istanbul ignore file */

import CRUD from "./CRUD.js";

export default class Price extends CRUD {
  static getBaseUrl() {
    return "admin/prices";
  }
}
