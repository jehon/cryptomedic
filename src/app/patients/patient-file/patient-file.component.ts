import { Component, Input } from "@angular/core";
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
}
