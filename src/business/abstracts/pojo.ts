import { plainToInstance } from "class-transformer";
import { immerable } from "immer";
import type { BusinessType } from "../../config";
import { type StringDate } from "../../utils/types";

export default class Pojo {
  [immerable] = true;

  static factory<T extends Pojo>(json = {}, type: BusinessType) {
    return plainToInstance(this, { ...json, _type: type }) as T;
  }

  static getTechnicalName(): BusinessType {
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

  // TODO: Temporary
  _type: string = "pojo";
}
