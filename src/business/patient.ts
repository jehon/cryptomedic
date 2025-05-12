import { Type } from "class-transformer";
import "reflect-metadata"; // Required by class-transformer
import type { BusinessType } from "../config";
import { type StringNumber } from "../utils/types";
import PatientRelated from "./abstracts/patient-related";
import Appointment from "./appointment";
import Bill from "./bill";
import ConsultClubfoot from "./consult-clubfoot";
import ConsultOther from "./consult-other";
import ConsultRicket from "./consult-ricket";
import Picture from "./picture";
import Surgery from "./surgery";

// TODO: this is not a PatientRelated
export default class Patient extends PatientRelated {
  static override getTechnicalName(): BusinessType {
    return "patient";
  }

  entry_year: StringNumber = "" + new Date().getFullYear();
  entry_order: StringNumber = "";
  name: string = "";
  sex: string = "";
  year_of_birth: string = "" + new Date().getFullYear();
  pathology: string = "";
  phone: string = "";
  address_district: string = "";
  // TODO: should be upazila (1 l)
  address_upazilla: string = "";
  address_union: string = "";
  address_comments: string = "";
  comments: string = "";

  // !! This map to getTechnicalName() !!

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
