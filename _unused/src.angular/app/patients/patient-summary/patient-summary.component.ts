import { JsonPipe, NgFor } from "@angular/common";
import { Component, Input } from "@angular/core";
import { AppointmentComponent } from "../appointment/appointment.component";
import { BillComponent } from "../bill/bill.component";
import Patient from "../business/patient";
import { ConsultClubfootComponent } from "../consult-clubfoot/consult-clubfoot.component";
import { ConsultOtherComponent } from "../consult-other/consult-other.component";
import { ConsultRicketComponent } from "../consult-ricket/consult-ricket.component";
import { FilePanelComponent } from "../file-panel/file-panel.component";
import { PatientFileComponent } from "../patient-file/patient-file.component";
import PatientsService from "../patients.service";
import { PictureComponent } from "../picture/picture.component";
import { SurgeryComponent } from "../surgery/surgery.component";

@Component({
  selector: "app-patient-summary",
  standalone: true,
  imports: [
    JsonPipe,
    PatientFileComponent,
    FilePanelComponent,
    NgFor,
    AppointmentComponent,
    BillComponent,
    ConsultClubfootComponent,
    ConsultOtherComponent,
    ConsultRicketComponent,
    PictureComponent,
    SurgeryComponent
  ],
  templateUrl: "./patient-summary.component.html",
  styleUrl: "./patient-summary.component.css"
})
export class PatientSummaryComponent {
  #id: string = "";
  patient?: Patient;

  constructor(private patientsService: PatientsService) {}

  @Input()
  set id(id: string) {
    this.#id = id;
    this.getData();
  }

  get id() {
    return this.#id;
  }

  getData(): void {
    this.patientsService.getPatientObservable().subscribe((val?: Patient) => {
      this.patient = val;
    });
  }
}
