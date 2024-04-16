import { Component, Input } from "@angular/core";
import { IoComponent } from "../../generic/io/io.component";
import Surgery from "../business/surgery";
import { FilePanelComponent } from "../file-panel/file-panel.component";

@Component({
  selector: "app-surgery",
  standalone: true,
  imports: [FilePanelComponent, IoComponent],
  templateUrl: "./surgery.component.html"
})
export class SurgeryComponent {
  @Input()
  file?: Surgery;

  // TODO: Validation: Date must be in the past
}
