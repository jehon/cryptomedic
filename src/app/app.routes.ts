import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { PatientSummaryComponent } from "./patients/patient-summary/patient-summary.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "home", component: HomeComponent },
  { path: "patients", component: PatientSummaryComponent },
  { path: "", redirectTo: "home", pathMatch: "full" }
];

export default routes;
