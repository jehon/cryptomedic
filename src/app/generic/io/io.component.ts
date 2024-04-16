import { Attribute, Component, ElementRef, Input, OnInit } from "@angular/core";

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
  @Input() edit: boolean = false;

  constructor(
    private el: ElementRef,
    @Attribute("type") public type: FieldType,
    @Attribute("label") public label: string,
    @Attribute("readonly") public readonly: boolean = false,
    @Attribute("list-name") public listName: string = ""
  ) {}

  ngOnInit(): void {
    if (!fieldTypeValues.includes(this.type)) {
      throw new Error(
        `IO Component: Type ${this.type} is not a recognized type`
      );
    }
  }

  get left(): boolean {
    return this.el.nativeElement.hasAttribute("left");
  }

  get right(): boolean {
    return this.el.nativeElement.hasAttribute("right");
  }

  get required(): boolean {
    return this.el.nativeElement.hasAttribute("required");
  }
}
