import { Component, Input } from "@angular/core";
import { IoComponent } from "../../generic/io-string/io.component";
import ConsultRicket from "../business/consult-ricket";
import { FilePanelComponent } from "../file-panel/file-panel.component";

@Component({
  selector: "app-consult-ricket",
  standalone: true,
  imports: [FilePanelComponent, IoComponent],
  templateUrl: "./consult-ricket.component.html"
})
export class ConsultRicketComponent {
  @Input()
  file?: ConsultRicket;
}
