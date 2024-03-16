import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";

const routes: Routes = [
  { path: "home", component: HomeComponent },
  // FIXME: temp debug routes
  { path: "home2", component: HomeComponent },
  { path: "home3", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "", redirectTo: "home", pathMatch: "full" }
];

export default routes;
