export type StringDate = string;
export type StringBoolean = string;

export const ModelSymbol = Symbol("model");

export default class Pojo {
  getTechnicalName(): string {
    return "pojo";
  }

  id: string = "";
  created_at: StringDate = "";
  updated_at: StringDate = "";
  last_user: string = "";

  get uuid(): string {
    return this.getTechnicalName() + "." + this.id;
  }
}
