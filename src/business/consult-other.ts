import Consult from "./abstracts/consult";

export default class ConsultOther extends Consult {
  static override getModel() {
    return "OtherConsult";
  }

  static override getTechnicalName() {
    return "consult_other";
  }

  static override getTitle() {
    return "Consult. Other";
  }

  side: string = "";
  joints_or_bones_affected: string = "";
  deformity: string = "";
  articulation_mobility: string = "";
  muscle_strength: string = "";
  pain: string = "";
  walk: string = "";
  xray: string = "";
  performed: string = "";
  not_performed: string = "";
}
