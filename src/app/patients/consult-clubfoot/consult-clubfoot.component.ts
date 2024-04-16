import { Component, Input } from "@angular/core";
import { IoComponent } from "../../generic/io/io.component";
import ConsultClubfoot from "../business/consult-clubfoot";
import { FilePanelComponent } from "../file-panel/file-panel.component";

@Component({
  selector: "app-consult-clubfoot",
  standalone: true,
  imports: [FilePanelComponent, IoComponent],
  templateUrl: "./consult-clubfoot.component.html"
})
export class ConsultClubfootComponent {
  @Input()
  file?: ConsultClubfoot;

  // getPiraniLeft() {
  //   // TODO: try-catch it in gui
  //   try {
  //     return (
  //       f(this.curved_lateral_border_left) +
  //       f(this.medial_crease_left) +
  //       f(this.talar_head_coverage_left) +
  //       f(this.posterior_crease_left) +
  //       f(this.rigid_equinus_left) +
  //       f(this.empty_heel_left)
  //     );
  //   } catch (e) {
  //     return "undefined";
  //   }
  // }
  // getPiraniRight() {
  //   // TODO: try-catch it in gui
  //   try {
  //     return (
  //       f(this.curved_lateral_border_right) +
  //       f(this.medial_crease_right) +
  //       f(this.talar_head_coverage_right) +
  //       f(this.posterior_crease_right) +
  //       f(this.rigid_equinus_right) +
  //       f(this.empty_heel_right)
  //     );
  //   } catch (e) {
  //     return "undefined";
  //   }
  // }
}
