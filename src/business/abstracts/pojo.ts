import { plainToInstance } from "class-transformer";
import { immerable, produce } from "immer";
import { StringDate } from "../../utils/types";

export default class Pojo {
  [immerable] = true;

  static factory<T extends Pojo>(json = {}) {
    return plainToInstance(this, json) as T;
  }

  static getModel() {
    return "Pojo";
  }

  static getTechnicalName() {
    // Patient map this name to the list field (getChildren)
    return "pojo";
  }

  static getTitle() {
    return this.getModel();
  }

  declare ["constructor"]: typeof Pojo;

  getStatic(): typeof Pojo {
    return this.constructor;
  }

  id?: string;
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

  getList<T extends Pojo>(list: keyof this): T[] {
    return this[list] as T[];
  }

  withFile(listName: keyof this, file: Pojo): this {
    //
    // We remove and add in one run
    // to avoid building twice the folder
    //
    return produce(this.withoutFile(listName, file), (draft: this) => {
      draft.getList(listName).push(file);
    });
  }

  withoutFile(listName: keyof this, file: Pojo): this {
    const i = this.getList(listName).findIndex(
      (val: Pojo) => val.uid() === file.uid()
    );
    if (i < 0) {
      return this;
    }

    return produce(this, (draft: this) => {
      draft.getList(listName).splice(i, 1);
    });
  }
}

export function filterById(list: Pojo[], id: string) {
  return list.filter((p) => p.id == id)[0];
}
