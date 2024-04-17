import constants from "../../../generic/constants";
import { StringDate } from "../../../generic/io/io.component";

export const ModelSymbol = Symbol("model");

export default class Pojo {
  getTechnicalName(): string {
    return "pojo";
  }

  getTitle(): string {
    return this.getTechnicalName();
  }

  id: string = "";
  created_at: StringDate = "";
  updated_at: StringDate = "";
  last_user: string = "";

  get uuid(): string {
    return this.getTechnicalName() + "." + this.id;
  }

  isLocked() {
    const dlock = new Date(this.updated_at);
    dlock.setDate(dlock.getDate() + constants.freezeDays);
    return dlock < new Date();
  }
}
