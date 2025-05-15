import { type StringList } from "../app-patient/objects";
import Consult from "./abstracts/consult";

export default class ConsultOther extends Consult {
  side: StringList = "";
  joints_or_bones_affected: string = "";
  deformity: string = "";
  articulation_mobility: string = "";
  muscle_strength: string = "";
  pain: StringList = "";
  walk: StringList = "";
  xray: string = "";
  examination_data: string = "";

  // TODO: Remove this fields in DB
  x_performed: string = "";
  x_not_performed: string = "";
}
