import { CommonModule } from "@angular/common";
import { Attribute, Component, ElementRef, Input, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
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
  imports: [SideComponent, CommonModule, FormsModule],
  templateUrl: "./io.component.html",
  styleUrl: "./io.component.css"
})
export class IoComponent implements OnInit {
  #label: string = "";
  #value: any = "";
  #edit: boolean = false;
  hidden: boolean = false;

  @Input("list-name") listName: string = "";

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
  }

  @Input()
  set label(l: string) {
    this.#label = l;

    // Trick to have label set definitively...
    this.el.nativeElement.setAttribute("label", this.label);
  }

  get label(): string {
    return this.#label;
  }

  @Input() set value(v: any) {
    this.#value = v;
    this.#calculateHidden();
  }

  get value(): any {
    return this.#value;
  }

  hasValue(): boolean {
    return this.value !== "?" && this.value;
  }

  @Input() set edit(v: any) {
    this.#edit = v;
    this.#calculateHidden();
  }

  get edit(): any {
    return this.#edit;
  }

  #calculateHidden() {
    this.hidden = !this.hasValue() && !this.edit;
    this.el.nativeElement.toggleAttribute("hidden", this.hidden);
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
