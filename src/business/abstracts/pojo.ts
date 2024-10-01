import { plainToInstance } from "class-transformer";
import { immerable } from "immer";
import { StringDate } from "../../utils/types";

export default class Pojo {
  [immerable] = true;

  static factory(json = {}) {
    return plainToInstance(this, json);
  }

  static getModel() {
    return "Pojo";
  }

  static getTechnicalName() {
    return "pojo";
  }

  static getTitle() {
    return this.getModel();
  }
  declare ["constructor"]: typeof Pojo;

  getStatic(): typeof Pojo {
    return this.constructor;
  }

  id: string = "";
  created_at: StringDate = "";
  updated_at: StringDate = "";
  last_user: string = "";

  getId() {
    return this.id;
  }

  uid() {
    return `${this.getStatic().getTechnicalName()}.${this.getId() ?? "add"}`;
  }

  isLocked() {
    return false;
  }

  getParentField(): string | undefined {
    return undefined;
  }

  getParentId(): string | undefined {
    return undefined;
  }
}
