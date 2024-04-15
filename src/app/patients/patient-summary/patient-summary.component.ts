import { JsonPipe, NgFor } from "@angular/common";
import { Component, Input } from "@angular/core";
import { AppointmentFileComponent } from "../appointment-file/appointment-file.component";
import PatientRelated from "../business/abstracts/patient-related";
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
    AppointmentFileComponent
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

  getRelated(): PatientRelated[] {
    if (!this.patient) {
      return [];
    }

    return [
      ...this.patient.appointment,
      ...this.patient.bill,
      ...this.patient.club_foot,
      ...this.patient.other_consult,
      ...this.patient.ricket_consult,
      ...this.patient.picture,
      ...this.patient.surgery
    ].toSorted(patientRelatedOrder);
  }
}

export function patientRelatedOrder(
  o1: PatientRelated,
  o2: PatientRelated
): number {
  const o1First = -1;
  const o2First = 1;

  // What to do if one 'date' is missing
  if (!o1.date && o2.date) {
    return 20 * o1First;
  }

  if (!o2.date && o1.date) {
    return 20 * o2First;
  }

  // Both 'date' are present
  if (o1.date && o2.date) {
    if (o1.date < o2.date) return 30 * o2First;
    if (o1.date > o2.date) return 30 * o1First;
  }

  if (o1.created_at < o2.created_at) return 40 * o2First;
  if (o1.created_at > o2.created_at) return 40 * o1First;

  const o1id = parseInt(o1.id);
  const o2id = parseInt(o2.id);
  if (!isNaN(o1id) && !isNaN(o2id)) {
    if (o1id > o2id) return 50 * o1First;
    if (o1id < o2id) return 50 * o2First;
  }

  return 0;
}
