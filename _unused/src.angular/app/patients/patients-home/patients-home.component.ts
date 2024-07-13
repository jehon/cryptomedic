import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-patients-home",
  standalone: true,
  imports: [RouterLink],
  templateUrl: "./patients-home.component.html",
  styleUrl: "./patients-home.component.css"
})
export class PatientsHomeComponent {}
