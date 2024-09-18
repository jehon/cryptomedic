import { immerable } from "immer";

export default class Pojo {
  [immerable] = true;

  static getTechnicalName() {
    return "pojo";
  }

  static getModel() {
    return "Pojo";
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

  // [key: string]: string

  id;
  created_at;
  updated_at;
  last_user;

  /**
   *
   * @param {id?}
   * @param {created_at?}
   * @param {updated_at?}
   * @param {last_user?}
   */
  constructor({ id, created_at, updated_at, last_user, ...others } = {}) {
    this.id = id;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.last_user = last_user;

    // TODO: legacy
    if (others) {
      Object.assign(this, others);
    }
  }

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

  getServerResource() {
    return this.getStatic().getModel().toLowerCase() + "s";
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
