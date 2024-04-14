import { Type } from "class-transformer";
import Pojo from "./abstracts/pojo";
import Appointment from "./appointment";
import Bill from "./bill";
import ConsultClubfoot from "./consult-clubfoot";
import ConsultOther from "./consult-other";
import ConsultRicket from "./consult-ricket";
import Picture from "./picture";
import Surgery from "./surgery";

export default class Patient extends Pojo {
  entry_year: string = "";
  entry_order: string = "";
  name: string = "";
  sex?: "Male" | "Female";
  year_of_birth?: string;
  phone: string = "";
  address_comments: string = "";
  address_district?: string;
  address_upazilla?: string;
  address_union?: string;
  pathology: string = "";
  comments: string = "";

  @Type(() => Appointment)
  appointment: Appointment[] = [];

  @Type(() => Bill)
  bill: Bill[] = [];

  @Type(() => ConsultClubfoot)
  club_foot: ConsultClubfoot[] = [];

  @Type(() => ConsultOther)
  other_consult: ConsultOther[] = [];

  @Type(() => ConsultRicket)
  ricket_consult: ConsultRicket[] = [];

  @Type(() => Picture)
  picture: Picture[] = [];

  @Type(() => Surgery)
  surgery: Surgery[] = [];
}
