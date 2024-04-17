import {
  Component,
  ContentChildren,
  Input,
  OnInit,
  QueryList
} from "@angular/core";
import constants from "../../generic/constants";
import { DateComponent } from "../../generic/date/date.component";
import { IoComponent } from "../../generic/io/io.component";
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
  editMode: boolean = false;

  // To get info in ngContent
  // @ContentChild(IoComponent) ioList!: QueryList<IoComponent>;
  @ContentChildren(IoComponent, { descendants: true })
  ioList!: QueryList<IoComponent>;

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

  goMode(edit: boolean): void {
    this.editMode = edit;
    this.ioList.forEach((el) => (el.edit = edit));
  }

  goEdit() {
    this.goMode(true);
  }

  doCancel() {
    this.goMode(false);
  }

  doSave() {
    this.goMode(false);
  }

  doUnlock() {
    this.goMode(true);
  }

  doDelete() {}
}
