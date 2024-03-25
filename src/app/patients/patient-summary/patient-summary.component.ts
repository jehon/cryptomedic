import { Component, Input } from "@angular/core";

@Component({
  selector: "app-patient-summary",
  standalone: true,
  imports: [],
  templateUrl: "./patient-summary.component.html",
  styleUrl: "./patient-summary.component.css"
})
export class PatientSummaryComponent {
  #id: string = "";

  @Input()
  set id(id: string) {
    this.#id = id;
  }

  get id() {
    return this.#id;
  }
}
