import { Component, Input, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import Patient from "../business/patient";
import PatientsService from "../patients.service";

@Component({
  selector: "app-patient-loading",
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: "./patient-loading.component.html"
})
export class PatientLoadingComponent implements OnInit {
  #id: string = "id";
  patient?: Patient;

  constructor(private patientsService: PatientsService) {}

  @Input("id")
  set id(id: string) {
    this.#id = id;
    this.patientsService.load(id);
  }

  get id() {
    return this.#id;
  }

  ngOnInit(): void {
    this.patientsService.getPatientObservable().subscribe((val?: Patient) => {
      this.patient = val;
    });
  }
}
