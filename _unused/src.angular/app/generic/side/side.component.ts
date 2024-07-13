import { CommonModule } from "@angular/common";
import { Attribute, Component } from "@angular/core";

@Component({
  selector: "app-side",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./side.component.html",
  styleUrl: "./side.component.css"
})
export class SideComponent {
  constructor(@Attribute("side") public side: string) {}
}
