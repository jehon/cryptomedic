import { ObjectMap } from "../utils/generic-types";
import S from "string";

export default class Pojo implements ObjectMap<any> {
  constructor(public id: number = 0) {}

  // This allow to be overriden
  getModel(): string {
    return this.constructor.name;
  }

  get uid() {
    return `${S(this.getModel()).slugify().s}-${this.id}`;
  }

  // isSet(field: string): boolean {
  //   if (typeof this[field] == "undefined") {
  //     return false;
  //   }
  //   if (this[field] == null) {
  //     return false;
  //   }
  //   return true;
  // }

  // isNotZero(field) {
  //   if (!this.isSet(field)) {
  //     return false;
  //   }
  //   if (this[field] === 0) {
  //     return false;
  //   }
  //   return true;
  // }
}
