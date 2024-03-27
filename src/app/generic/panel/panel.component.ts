import { Attribute, Component, Input, TemplateRef } from "@angular/core";

@Component({
  selector: "app-panel",
  standalone: true,
  templateUrl: "./panel.component.html",
  styleUrl: "./panel.component.css"
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
