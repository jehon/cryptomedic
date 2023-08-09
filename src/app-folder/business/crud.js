/* istanbul ignore file */

import nullify from "../../utils/nullify.js";
import { toAttributeCase } from "../../../legacy/app-old/v2/js/string-utils.js";

export default class CRUD {
  static getBaseUrl() {
    throw new Error("getBaseUrl is not implemented");
  }

  static list(network) {
    return network.start().requestWithGet().requestToUrl(this.getBaseUrl());
  }

  static create(network, data) {
    return network
      .start()
      .requestWithPost()
      .requestToUrl(this.getBaseUrl())
      .requestWithData(nullify(data));
  }

  static remove(network, id) {
    return network
      .start()
      .requestWithDelete()
      .requestToUrl(this.getBaseUrl() + "/" + id);
  }

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
    return `${toAttributeCase(this.getModel())}-${this.id}`;
  }

  validate(res) {
    if (!res) {
      res = {};
    }
    return res;
  }
}
