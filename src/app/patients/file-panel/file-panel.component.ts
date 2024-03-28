import { Attribute, Component, Input } from "@angular/core";
import Pojo from "../business/abstracts/pojo";
import Patient from "../business/patient";

@Component({
  selector: "app-file-panel",
  standalone: true,
  templateUrl: "./file-panel.component.html",
  styleUrl: "./file-panel.component.css"
})
export class FilePanelComponent {
  @Input() file: Pojo = new Pojo();

  constructor(
    @Attribute("label") public label: string,
    @Attribute("opened") public statusOpenend: boolean = false,
    @Attribute("patient") public patient?: Patient,
    @Attribute("patient") public header?: string
  ) {}

  toggleOpen() {
    this.statusOpenend = !this.statusOpenend;
  }
}
