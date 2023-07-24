import Pojo from "./pojo";

export default class CRUD extends Pojo {
  static getBaseUrl() {
    throw new Error("getBaseUrl is not implemented");
  }

  created_at: Date | null;
  updated_at: Date | null;

  constructor(
    { created_at, updated_at, id } = {
      created_at: null,
      updated_at: null,
      id: 0
    }
  ) {
    super({ id });
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  validate(res) {
    if (!res) {
      res = {};
    }
    return res;
  }
}
