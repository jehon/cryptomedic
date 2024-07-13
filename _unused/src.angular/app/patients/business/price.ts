import constants from "../../generic/constants";
import { StringDate } from "../../generic/io/io.component";
import Pojo from "./abstracts/pojo";

export default class Price extends Pojo {
  override getTechnicalName() {
    return constants.models["price"].name;
  }

  date_from?: StringDate;
  date_to?: StringDate;
  // We can not be more precise because
  // if not any, other fields will conflict
  [x: string]: any;
}
