import { immerable } from "immer";
import nullify from "../../app-old/v1/nullify.js";

export default class Pojo {
  [immerable] = true;

  // Legacy
  static getBaseUrl() {
    throw new Error("getBaseUrl is not implemented");
  }

  // Legacy
  static list(network) {
    return network.start().requestWithGet().requestToUrl(this.getBaseUrl());
  }

  // Legacy
  static create(network, data) {
    return network
      .start()
      .requestWithPost()
      .requestToUrl(this.getBaseUrl())
      .requestWithData(nullify(data));
  }

  // Legacy
  static remove(network, id) {
    return network
      .start()
      .requestWithDelete()
      .requestToUrl(this.getBaseUrl() + "/" + id);
  }

  // Legacy
  static save(network, data) {
    return network
      .start()
      .requestWithPut()
      .requestToUrl(this.getBaseUrl() + "/" + data.id)
      .requestWithData(data);
  }

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

  // Legacy
  getRelated() {
    return {};
  }

  createNewInstance(json) {
    // See https://stackoverflow.com/a/73328117/1954789
    return new (Object.getPrototypeOf(this).constructor)(json);
  }
}
