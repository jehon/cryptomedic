import Pojo from "./pojo";

export default class CRUD extends Pojo {
  static getBaseUrl(): string {
    throw new Error("getBaseUrl is not implemented");
  }

  // static list(network): CRUD[] {
  //   return network.start().requestWithGet().requestToUrl(this.getBaseUrl());
  // }

  // static create(network, data) {
  //   return network
  //     .start()
  //     .requestWithPost()
  //     .requestToUrl(this.getBaseUrl())
  //     .requestWithData(nullify(data));
  // }

  constructor(id: number = 0) {
    super(id);
  }

  // save(network, data) {
  //   return network
  //     .start()
  //     .requestWithPut()
  //     .requestToUrl(this.getBaseUrl() + "/" + data.id)
  //     .requestWithData(data);
  // }

  // remove(network, id) {
  //   return network
  //     .start()
  //     .requestWithDelete()
  //     .requestToUrl(this.getBaseUrl() + "/" + id);
  // }

  // validate(res: ObjectMap<any>): ObjectMap<any> {
  //   if (!res) {
  //     res = {};
  //   }
  //   return res;
  // }
}
