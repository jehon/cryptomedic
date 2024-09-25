import { StringDate } from "../utils/types.js";
import Pojo from "./abstracts/pojo.js";

export default class Price extends Pojo {
  static override getModel() {
    return "Price";
  }

  static override getTechnicalName() {
    return "price";
  }

  static getCategories() {
    return ["consult", "medecine", "other", "workshop", "surgical"];
  }

  date_from?: StringDate;
  date_to?: StringDate;
  // We can not be more precise because
  // if not any, other fields will conflict
  [x: string]: any;
}
