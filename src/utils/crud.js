import Pojo from "./pojo";
import nullify from "./nullify";

export default class CRUD extends Pojo {
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

  createdAt;
  updatedAt;

  constructor({ id, created_at, updated_at }) {
    super(id);
    this.createdAt = created_at ?? null;
    this.updatedAt = updated_at ?? null;
  }

  save(network, data) {
    return network
      .start()
      .requestWithPut()
      .requestToUrl(this.getBaseUrl() + "/" + data.id)
      .requestWithData(data);
  }

  remove(network, id) {
    return network
      .start()
      .requestWithDelete()
      .requestToUrl(this.getBaseUrl() + "/" + id);
  }

  validate(res) {
    if (!res) {
      res = {};
    }
    return res;
  }
}
