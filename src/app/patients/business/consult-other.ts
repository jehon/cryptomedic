import constants from "../../generic/constants";
import Consult from "./abstracts/consult";

export default class ConsultOther extends Consult {
  override getTechnicalName(): string {
    return constants.models.consult_other.name;
  }

  side?: string;
  joints_or_bones_affected?: string;
  deformity?: string;
  articulation_mobility?: string;
  muscle_strength?: string;
  pain?: string;
  walk?: string;
  xray?: string;
  performed?: string;
  not_performed?: string;
}
