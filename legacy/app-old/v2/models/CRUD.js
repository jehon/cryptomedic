/* istanbul ignore file */

import nullify from "../../../../src/utils/nullify.js";
import { toAttributeCase } from "../js/string-utils.js";

export default class CRUD {
  static getBaseUrl() {
    throw "getBaseUrl is not implemented";
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

  constructor(data = {}) {
    if (data) {
      Object.assign(this, data);
    }
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
