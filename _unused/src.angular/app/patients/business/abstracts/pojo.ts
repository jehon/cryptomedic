import constants from "../../../generic/constants";
import { StringDate } from "../../../generic/io/io.component";

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

  getTitle(): string {
    return this.getTechnicalName();
  }

  isLocked() {
    const dlock = new Date(this.updated_at);
    dlock.setDate(dlock.getDate() + constants.freezeDays);
    return dlock < new Date();
  }

  canDelete(): boolean {
    return true;
  }

  isTop(): boolean {
    return true;
  }
}
