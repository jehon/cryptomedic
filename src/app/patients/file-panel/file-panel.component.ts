import { Component, Input, OnInit } from "@angular/core";
import constants from "../../generic/constants";
import { DateComponent } from "../../generic/date/date.component";
import Pojo from "../business/abstracts/pojo";

@Component({
  selector: "app-file-panel",
  standalone: true,
  templateUrl: "./file-panel.component.html",
  styleUrl: "./file-panel.component.css",
  imports: [DateComponent]
})
export class FilePanelComponent implements OnInit {
  @Input() file: Pojo = new Pojo();
  @Input() model: string = "";

  statusOpened: boolean = false;
  view: string = "undefined";

  ngOnInit(): void {
    // So easier...
    this.view = window.location.hash.substring(1);

    if (this.view == this.file.uuid) {
      this.statusOpened = true;
    }

    if (this.model == constants.models.patient.name && this.view == "") {
      this.statusOpened = true;
    }
  }

  toggleOpen() {
    this.statusOpened = !this.statusOpened;
    if (this.statusOpened) {
      window.location.hash = this.file.uuid;
    }
  }

  get icon(): string {
    return constants.models[this.model]?.icon ?? "";
  }

  get label(): string {
    return constants.models[this.model]?.label ?? "";
  }
}
