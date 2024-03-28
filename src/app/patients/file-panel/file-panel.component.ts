import { Attribute, Component, Input } from "@angular/core";
import { icons } from "../../generic/constants";
import Pojo from "../business/abstracts/pojo";

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
    @Attribute("opened") public statusOpenend: boolean = false
  ) {}

  toggleOpen() {
    this.statusOpenend = !this.statusOpenend;
  }

  get icon(): string {
    if (this.file) {
      return icons.models[
        (this.file.getTechnicalName() as keyof typeof icons.models) ?? ""
      ];
    }
    return "";
  }
}
