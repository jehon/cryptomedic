export type StringDate = string;
export type StringBoolean = string;

export default class Pojo {
  id: string = "";
  created_at: StringDate = "";
  updated_at: StringDate = "";
  last_user: string = "";

  normalize(): this {
    return this;
  }

  getTechnicalName(): string {
    return "pojo";
  }

  get uuid(): string {
    return this.getTechnicalName() + "." + this.id;
  }
}
