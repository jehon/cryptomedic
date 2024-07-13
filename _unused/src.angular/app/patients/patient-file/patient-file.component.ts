import { Component, Input } from "@angular/core";
import { ageWhen, string2date } from "../../_helpers/date";
import { IoComponent } from "../../generic/io/io.component";
import Patient from "../business/patient";
import { FilePanelComponent } from "../file-panel/file-panel.component";

@Component({
  selector: "app-patient-file",
  standalone: true,
  imports: [FilePanelComponent, IoComponent],
  templateUrl: "./patient-file.component.html",
  styleUrl: "./patient-file.component.css"
})
export class PatientFileComponent {
  @Input()
  file?: Patient;

  // TODO: calculate date of birth based on age
  // TODO: update upazilla & union list based on district & upazilla

  ageAtReference(reference: Date = new Date()): string {
    if (!this.file) {
      return "?";
    }

    if (!this.file.year_of_birth || !reference) {
      return "?";
    }
    return ageWhen(string2date(this.file.year_of_birth + ""), new Date());
  }
}
