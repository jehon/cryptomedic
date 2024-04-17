import constants from "../../generic/constants";
import { StringText } from "../../generic/io/io.component";
import PatientRelated from "./abstracts/patient-related";

export default class Surgery extends PatientRelated {
  override getTechnicalName(): string {
    return constants.models.surgery.name;
  }

  override getTitle(): string {
    return `surgery of ${this.date} about ${this.report_procedure}`;
  }

  report_diagnostic?: string;
  report_surgeon?: string;
  report_side_right?: boolean;
  report_side_left?: boolean;
  report_procedure?: string;
  follow_up_complication?: StringText;
}
