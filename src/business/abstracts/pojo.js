import { plainToInstance } from "class-transformer";
import { immerable } from "immer";

export default class Pojo {
  [immerable] = true;

  static factory(json = {}) {
    return plainToInstance(this, json);
  }

  static getModel() {
    return "Pojo";
  }

  static getTechnicalName() {
    return "pojo";
  }

  static getTitle() {
    return this.getModel();
  }

  /**
   * @returns {typeof Pojo}
   */
  getStatic() {
    return this.constructor;
  }

  id;
  created_at;
  updated_at;
  last_user;

  getId() {
    return this.id;
  }

  uid() {
    return `${this.getStatic().getTechnicalName()}.${this.getId() ?? "add"}`;
  }

  // Legacy
  validate(res) {
    if (!res) {
      res = {};
    }
    return res;
  }

  // Legacy
  isLocked() {
    return false;
  }

  /**
   * @returns {string | undefined}
   */
  getParentField() {
    return undefined;
  }

  /**
   * @returns {string | number | undefined}
   */
  getParentId() {
    return undefined;
  }
}
