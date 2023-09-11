import nullify from "../../utils/nullify.js";

export default class Pojo {
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
    return `${this.getModel()}-${this.id}`;
  }

  getModel() {
    throw new Error("getModel is not implemented");
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

  // Legacy
  getServerRessource() {
    return this.getModel().toLowerCase() + "s";
  }

  // Legacy
  getRelated() {
    return {};
  }
}
