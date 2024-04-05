import { JsonPipe, NgFor, NgIf } from "@angular/common";
import { Component, Input } from "@angular/core";
import { AppointmentFileComponent } from "../appointment-file/appointment-file.component";
import Patient from "../business/patient";
import { FilePanelComponent } from "../file-panel/file-panel.component";
import { PatientFileComponent } from "../patient-file/patient-file.component";
import PatientsService from "../patients.service";

@Component({
  selector: "app-patient-summary",
  standalone: true,
  imports: [
    JsonPipe,
    PatientFileComponent,
    FilePanelComponent,
    NgFor,
    NgIf,
    AppointmentFileComponent
  ],
  templateUrl: "./patient-summary.component.html",
  styleUrl: "./patient-summary.component.css"
})
export class PatientSummaryComponent {
  #id: string = "";
  patient?: Patient;
  #view: string = "";

  constructor(private patientsService: PatientsService) {}

  @Input()
  set id(id: string) {
    this.#id = id;
    this.getData();
  }

  get id() {
    return this.#id;
  }

  @Input()
  set view(viewUUID: string) {
    this.#view = viewUUID;
  }

  get view() {
    return this.#view;
  }

  getData(): void {
    this.patientsService.getPatientObservable().subscribe((val?: Patient) => {
      this.patient = val;
    });
  }
}
