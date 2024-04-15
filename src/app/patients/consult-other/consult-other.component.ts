import { Component, Input } from "@angular/core";
import { IoComponent } from "../../generic/io-string/io.component";
import ConsultOther from "../business/consult-other";
import { FilePanelComponent } from "../file-panel/file-panel.component";

@Component({
  selector: "app-consult-other",
  standalone: true,
  imports: [FilePanelComponent, IoComponent],
  templateUrl: "./consult-other.component.html"
})
export class ConsultOtherComponent {
  @Input()
  file?: ConsultOther;
}
