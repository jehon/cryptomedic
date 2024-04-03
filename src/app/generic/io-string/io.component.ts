import { Attribute, Component, Input } from "@angular/core";

@Component({
  selector: "app-io",
  standalone: true,
  imports: [],
  templateUrl: "./io.component.html",
  styleUrl: "./io.component.css"
})
export class IoComponent {
  @Input() value: any = "";
  // @Input() edit: boolean = false;
  // @Input() left: boolean = false;
  // @Input() right: boolean = false;
  // @Input() required: boolean = false;
  // @Input() note: boolean = false;

  constructor(
    @Attribute("type") public type: string,
    @Attribute("label") public label: string
  ) {}
}
