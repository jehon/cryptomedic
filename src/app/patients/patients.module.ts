import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { PatientSummaryComponent } from "./patient-summary/patient-summary.component";

@NgModule({
  declarations: [PatientSummaryComponent],
  imports: [CommonModule],
  exports: [PatientSummaryComponent]
})
export class PatientsModule {}
