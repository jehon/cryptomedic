import { type StringDate } from "../utils/types";
import Pojo from "./abstracts/pojo";

export default class Price extends Pojo {
  date_from?: StringDate;
  date_to?: StringDate;
  social_level_threshold_1: number = 0;
  social_level_threshold_2: number = 0;
  social_level_threshold_3: number = 0;
  social_level_threshold_4: number = 0;
  social_level_threshold_5: number = 0;

  // We can not be more precise because
  // if not any, other fields will conflict
  [x: string]: any;
}
