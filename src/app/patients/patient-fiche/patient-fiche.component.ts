import { Component, Input } from "@angular/core";
import { IoComponent } from "../../generic/io-string/io.component";
import Patient from "../business/patient";
import { FilePanelComponent } from "../file-panel/file-panel.component";

@Component({
  selector: "app-patient-file",
  standalone: true,
  imports: [FilePanelComponent, IoComponent],
  templateUrl: "./patient-fiche.component.html",
  styleUrl: "./patient-fiche.component.css"
})
export class PatientFicheComponent {
  @Input()
  file?: Patient;
}
