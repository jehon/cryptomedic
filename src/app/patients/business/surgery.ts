import PatientRelated from "./abstracts/patient-related";

export default class Surgery extends PatientRelated {
  override getTechnicalName(): string {
    return "surgery";
  }

  report_diagnostic?: string;
  report_surgeon?: string;
  report_side_right?: string;
  report_side_left?: string;
  report_procedure?: string;
  follow_up_complication?: string;

  // // Legacy
  // validate(res) {
  //   res = super.validate(res);

  //   if (this.date > new Date().toISOString()) {
  //     res.dateInTheFuture = true;
  //   }
  //   return res;
  // }
}
