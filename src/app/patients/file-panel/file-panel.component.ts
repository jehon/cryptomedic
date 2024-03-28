import { Attribute, Component, Input, TemplateRef } from "@angular/core";

@Component({
  selector: "app-file-panel",
  standalone: true,
  templateUrl: "./file-panel.component.html",
  styleUrl: "./file-panel.component.css"
})
export class PanelComponent {
  @Input() actions?: TemplateRef<any>;
  @Input() header?: TemplateRef<any>;

  constructor(
    @Attribute("label") public label: string,
    @Attribute("status-opened") public statusOpenend: boolean
  ) {}

  onClick() {
    this.statusOpenend = !this.statusOpenend;
  }
}
