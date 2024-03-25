import { Routes } from "@angular/router";
import { PatientSummaryComponent } from "./patient-summary/patient-summary.component";

const patientsRoutes: Routes = [
  { path: "patients", component: PatientSummaryComponent }
];
export default patientsRoutes;
