import { Component, Input } from "@angular/core";
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
}
