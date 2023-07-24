import { toAttributeCase } from "./strings";

export default class Pojo {
  id;

  constructor({ id } = { id: 0 }) {
    this.id = id;
  }

  // This allow to be overriden
  getModel() {
    return this.constructor.name;
  }

  get uid() {
    return `${toAttributeCase(this.getModel())}-${this.id}`;
  }
}
