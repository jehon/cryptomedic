import { Component, Input } from "@angular/core";
import Folder from "../../../../legacy/react/business/folder";
import PatientsService from "../patients.service";

@Component({
  selector: "app-patient-summary",
  standalone: true,
  imports: [],
  templateUrl: "./patient-summary.component.html",
  styleUrl: "./patient-summary.component.css"
})
export class PatientSummaryComponent {
  #id: string = "";
  folder?: Folder;

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
    this.patientsService.load(this.id).subscribe((val: Folder) => {
      this.folder = val;
    });
  }
}
