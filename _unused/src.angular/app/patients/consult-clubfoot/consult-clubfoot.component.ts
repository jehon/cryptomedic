import { Component, Input } from "@angular/core";
import { IoComponent } from "../../generic/io/io.component";
import { SideComponent } from "../../generic/side/side.component";
import ConsultClubfoot from "../business/consult-clubfoot";
import { ConsultComponent } from "../consult/consult.component";
import { FilePanelComponent } from "../file-panel/file-panel.component";

@Component({
  selector: "app-consult-clubfoot",
  standalone: true,
  imports: [FilePanelComponent, IoComponent, ConsultComponent, SideComponent],
  templateUrl: "./consult-clubfoot.component.html"
})
export class ConsultClubfootComponent {
  @Input()
  file?: ConsultClubfoot;
}
