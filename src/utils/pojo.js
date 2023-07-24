import { toAttributeCase } from "../../legacy/app-old/v2/js/string-utils.js";

export default class Pojo {
  id;

  constructor({ id }) {
    this.id = id ?? 0;
  }

  // This allow to be overriden
  getModel() {
    return this.constructor.name;
  }

  get uid() {
    return `${toAttributeCase(this.getModel()).slugify().s}-${this.id}`;
  }
}
