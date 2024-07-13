import { Component, Input, QueryList, ViewChildren } from "@angular/core";
import { IoComponent } from "../../generic/io/io.component";
import Consult from "../business/abstracts/consult";

@Component({
  selector: "app-consult",
  standalone: true,
  imports: [IoComponent],
  templateUrl: "./consult.component.html"
})
export class ConsultComponent {
  @Input()
  file?: Consult;

  @ViewChildren(IoComponent)
  ioList!: QueryList<IoComponent>;

  #edit: boolean = false;

  @Input() set edit(e: boolean) {
    this.#edit = e;
    this.ioList.forEach((el) => (el.edit = this.#edit));
  }

  get edit(): boolean {
    return this.#edit;
  }
}
