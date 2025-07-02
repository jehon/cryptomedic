import { plainToInstance } from "class-transformer";
import { immerable } from "immer";
import { type StringDate } from "../app-patient/_objects";
import type { BusinessType } from "../config";

export default class PojoClass {
  [immerable] = true;

  static factory<T extends PojoClass>(json = {}, type: BusinessType) {
    return plainToInstance(this, { ...json, _type: type }) as T;
  }

  declare ["constructor"]: typeof PojoClass;

  id?: string;
  created_at: StringDate = "";
  updated_at: StringDate = "";
  last_user: string = "";

  // TODO: Temporary
  _type: BusinessType = "pojo";
}
