import { Routes } from "@angular/router";
import { PatientSummaryComponent } from "./patient-summary/patient-summary.component";
import { PatientsHomeComponent } from "./patients-home/patients-home.component";

const patientsRoutes: Routes = [
  { path: "patients", component: PatientsHomeComponent },
  { path: "patients/:id", component: PatientSummaryComponent }
];
export default patientsRoutes;
