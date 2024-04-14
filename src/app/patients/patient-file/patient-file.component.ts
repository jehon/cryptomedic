import { Component, Input } from "@angular/core";
import { string2date } from "../../_helpers/date";
import { IoComponent } from "../../generic/io-string/io.component";
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

  @Input()
  opened: boolean = false;

  ageAtReference(reference: Date = new Date()): string {
    if (!this.file) {
      return "?";
    }

    if (!this.file.year_of_birth || !reference) {
      return "?";
    }

    // We have to take -1 for the month difference to be ok
    const birth_date = string2date(this.file.year_of_birth + "", -1);
    if (!birth_date) {
      return "?";
    }

    const days = new Date(
      0,
      0,
      0,
      0,
      0,
      0,
      reference.getTime() - birth_date.getTime()
    );
    const res = { years: days.getFullYear() - 1900, months: days.getMonth() };
    return res.years + "y" + res.months + "m";
  }
}
