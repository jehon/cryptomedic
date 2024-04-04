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
  patient?: Patient;

  constructor(private patientsService: PatientsService) {}

  @Input()
  set id(id: string) {
    this.patientsService.load(this.id);
  }

  get id() {
    return this.patient?.id ?? "";
  }

  ngOnInit(): void {
    this.patientsService.getPatientObservable().subscribe((val: Patient) => {
      this.patient = val;
    });
  }
}
