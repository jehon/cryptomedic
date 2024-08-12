import { immerable } from "immer";

export default class Pojo {
  [immerable] = true;

  getTechnicalName() {
    return "pojo";
  }

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
    return `${this.getTechnicalName()}.${this.id}`;
  }

  // TODO: abstract
  /**
   * @returns {string}
   */
  getModel() {
    throw new Error("getModel is not implemented");
  }

  /**
   * @returns {string}
   */
  getTitle() {
    return this.getModel();
  }

  // Legacy
  validate(res) {
    if (!res) {
      res = {};
    }
    return res;
  }

  // Legacy
  isSet(field) {
    if (typeof this[field] == "undefined") {
      return false;
    }
    if (this[field] == null) {
      return false;
    }
    return true;
  }

  // Legacy
  isNotZero(field) {
    if (!this.isSet(field)) {
      return false;
    }
    if (this[field] === 0) {
      return false;
    }
    return true;
  }

  // Legacy
  isLocked() {
    return false;
  }

  getServerRessource() {
    return this.getModel().toLowerCase() + "s";
  }

  createNewInstance(json) {
    // See https://stackoverflow.com/a/73328117/1954789
    return new (Object.getPrototypeOf(this).constructor)(json);
  }
}
