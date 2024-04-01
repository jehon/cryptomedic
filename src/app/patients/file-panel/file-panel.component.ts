import { Attribute, Component, Input } from "@angular/core";
import { technical2Human } from "../../_helpers/strings";
import { icons } from "../../generic/constants";
import { DateComponent } from "../../generic/date/date.component";
import Pojo from "../business/abstracts/pojo";

@Component({
  selector: "app-file-panel",
  standalone: true,
  templateUrl: "./file-panel.component.html",
  styleUrl: "./file-panel.component.css",
  imports: [DateComponent]
})
export class FilePanelComponent {
  @Input() file: Pojo = new Pojo();

  constructor(@Attribute("opened") public statusOpenend: boolean = false) {}

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

  get label(): string {
    return technical2Human(this.file.getTechnicalName());
  }
}
