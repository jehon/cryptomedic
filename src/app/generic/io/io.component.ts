import { Attribute, Component, Input } from "@angular/core";

export type FieldType =
  | "string"
  | "number"
  | "date"
  | "boolean"
  | "text"
  | "list";
const fieldTypeValues = ["string", "number", "date", "boolean", "text", "list"];

export type StringDate = string;
export type StringBoolean = string;
export type StringText = string;

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
    @Attribute("type") public type: FieldType,
    @Attribute("label") public label: string
  ) {
    if (!fieldTypeValues.includes(this.type)) {
      throw new Error(`IO Component: Type ${type} is not a recognized type`);
    }
  }
}
