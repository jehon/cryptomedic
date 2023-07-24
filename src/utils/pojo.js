import S from "string";

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
    return `${S(this.getModel()).slugify().s}-${this.id}`;
  }
}
