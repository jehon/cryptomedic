import {
  Attribute,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnInit
} from "@angular/core";
import { SideComponent } from "../side/side.component";

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
  imports: [SideComponent],
  templateUrl: "./io.component.html",
  styleUrl: "./io.component.css"
})
export class IoComponent implements OnInit {
  @Input() value: any = "";
  @Input() edit: boolean = false;
  @Input("list-name") listName: string = "";
  @Input() label: string = "";

  constructor(
    private el: ElementRef,
    @Attribute("type") public type: FieldType
  ) {}

  ngOnInit(): void {
    if (!fieldTypeValues.includes(this.type)) {
      throw new Error(
        `IO Component: Type ${this.type} is not a recognized type`
      );
    }
    // Trick to have label set definitively...
    this.el.nativeElement.setAttribute("label", this.label);
  }

  @HostBinding("hidden")
  get hidden(): boolean {
    return this.empty && !this.edit;
  }

  get empty(): boolean {
    return this.value === "?" || !this.value;
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

  get readonly(): boolean {
    return this.el.nativeElement.hasAttribute("read-only");
  }
}
