import { Component, Input } from "@angular/core";
import { IoComponent } from "../../generic/io-string/io.component";
import Appointment from "../business/appointment";
import { FilePanelComponent } from "../file-panel/file-panel.component";

@Component({
  selector: "app-appointment-file",
  standalone: true,
  imports: [FilePanelComponent, IoComponent],
  templateUrl: "./appointment-file.component.html",
  styleUrl: "./appointment-file.component.css"
})
export class AppointmentFileComponent {
  @Input()
  file?: Appointment;

  @Input()
  opened: boolean = false;
}
