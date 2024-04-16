import { Attribute, Component, Input, OnInit } from "@angular/core";

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
export type StringList = string;

@Component({
  selector: "app-io",
  standalone: true,
  imports: [],
  templateUrl: "./io.component.html",
  styleUrl: "./io.component.css"
})
export class IoComponent implements OnInit {
  @Input() value: any = "";
  // @Input() left: boolean = false;
  // @Input() right: boolean = false;
  // @Input() edit: boolean = false;

  constructor(
    @Attribute("type") public type: FieldType,
    @Attribute("label") public label: string,
    @Attribute("readonly") public readonly: boolean = false,
    @Attribute("required") public required: boolean = false,
    @Attribute("list-name") public listName: string = ""
  ) {}

  ngOnInit(): void {
    if (!fieldTypeValues.includes(this.type)) {
      throw new Error(
        `IO Component: Type ${this.type} is not a recognized type`
      );
    }
  }
}
