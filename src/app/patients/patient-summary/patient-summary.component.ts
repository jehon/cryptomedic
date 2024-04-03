import { JsonPipe, NgFor } from "@angular/common";
import { Component, Input } from "@angular/core";
import { IoComponent } from "../../generic/io-string/io.component";
import Patient from "../business/patient";
import { FilePanelComponent } from "../file-panel/file-panel.component";
import PatientsService from "../patients.service";

@Component({
  selector: "app-patient-summary",
  standalone: true,
  imports: [JsonPipe, FilePanelComponent, NgFor, IoComponent],
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
    this.getFolder();
  }

  get id() {
    return this.#id;
  }

  getFolder(): void {
    this.patientsService.load(this.id).subscribe((val: Patient) => {
      this.patient = val;
    });
  }
}
