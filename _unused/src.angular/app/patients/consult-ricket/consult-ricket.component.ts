import { Component, Input } from "@angular/core";
import { IoComponent } from "../../generic/io/io.component";
import { SideComponent } from "../../generic/side/side.component";
import ConsultRicket from "../business/consult-ricket";
import { ConsultComponent } from "../consult/consult.component";
import { FilePanelComponent } from "../file-panel/file-panel.component";

@Component({
  selector: "app-consult-ricket",
  standalone: true,
  imports: [FilePanelComponent, IoComponent, ConsultComponent, SideComponent],
  templateUrl: "./consult-ricket.component.html"
})
export class ConsultRicketComponent {
  @Input()
  file?: ConsultRicket;
}
