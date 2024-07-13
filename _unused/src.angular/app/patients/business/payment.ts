import constants from "../../generic/constants";
import { StringDate, StringText } from "../../generic/io/io.component";
import Pojo from "./abstracts/pojo";

export default class Payment extends Pojo {
  override getTechnicalName() {
    return constants.models["payment"].name;
  }

  bill_id!: string;
  date?: StringDate;
  examiner?: string;
  amount!: number;
  comments?: StringText;
}
