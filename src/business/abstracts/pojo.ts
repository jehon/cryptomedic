import { plainToInstance } from "class-transformer";
import { immerable } from "immer";
import { type StringDate } from "../../utils/types";

export default class Pojo {
  [immerable] = true;

  static factory<T extends Pojo>(json = {}) {
    return plainToInstance(this, json) as T;
  }

  static getTechnicalName() {
    // Patient map this name to the list field (getChildren)
    return "pojo";
  }

  declare ["constructor"]: typeof Pojo;

  getStatic(): typeof Pojo {
    return this.constructor;
  }

  id?: string;
  created_at: StringDate = "";
  updated_at: StringDate = "";
  last_user: string = "";
}
