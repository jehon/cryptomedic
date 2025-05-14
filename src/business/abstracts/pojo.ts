import { plainToInstance } from "class-transformer";
import { immerable } from "immer";
import type { BusinessType } from "../../config";
import { type StringDate } from "../../utils/types";

export default class Pojo {
  [immerable] = true;

  static factory<T extends Pojo>(json = {}, type: BusinessType) {
    return plainToInstance(this, { ...json, _type: type }) as T;
  }

  declare ["constructor"]: typeof Pojo;

  id?: string;
  created_at: StringDate = "";
  updated_at: StringDate = "";
  last_user: string = "";

  // TODO: Temporary
  _type: BusinessType = "pojo";
}
