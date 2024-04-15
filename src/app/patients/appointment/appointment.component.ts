import { Component, Input } from "@angular/core";
import { IoComponent } from "../../generic/io-string/io.component";
import Appointment from "../business/appointment";
import { FilePanelComponent } from "../file-panel/file-panel.component";

@Component({
  selector: "app-appointment",
  standalone: true,
  imports: [FilePanelComponent, IoComponent],
  templateUrl: "./appointment.component.html"
})
export class AppointmentComponent {
  @Input()
  file?: Appointment;
}
