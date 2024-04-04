import { Routes } from "@angular/router";
import { PatientFileComponent } from "./patient-file/patient-file.component";
import { PatientLoadingComponent } from "./patient-loading/patient-loading.component";
import { PatientSummaryComponent } from "./patient-summary/patient-summary.component";
import { PatientsHomeComponent } from "./patients-home/patients-home.component";

const patientsRoutes: Routes = [
  { path: "patients", component: PatientsHomeComponent },
  {
    path: "patients/:id",
    component: PatientLoadingComponent,
    children: [
      { path: "", component: PatientSummaryComponent },
      { path: "patient", component: PatientFileComponent }
    ]
  }
];
export default patientsRoutes;
