import { Type } from "class-transformer";
import "reflect-metadata"; // Required by class-transformer
import Timed from "./abstracts/timed";
import Payment from "./payment";

export default class Bill extends Timed {
  price_id: string = "";
  sl_family_salary: number = 0;
  sl_number_of_household_members: number = 0; // TODO: Max 10
  total_real: number = 0;
  social_level: number = 0;
  total_asked: number = 0;

  @Type(() => Payment)
  payment: Payment[] = [];
}
