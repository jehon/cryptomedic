import { NgIf } from "@angular/common";
import {
  Component,
  ContentChildren,
  Input,
  OnInit,
  QueryList,
  ViewChild
} from "@angular/core";
import AuthService from "../../_services/auth.service";
import {
  ConfirmComponent,
  doNothing
} from "../../generic/confirm/confirm.component";
import constants from "../../generic/constants";
import { DateComponent } from "../../generic/date/date.component";
import { IoComponent } from "../../generic/io/io.component";
import Pojo from "../business/abstracts/pojo";
import PatientsService from "../patients.service";

@Component({
  selector: "app-file-panel",
  standalone: true,
  templateUrl: "./file-panel.component.html",
  styleUrl: "./file-panel.component.css",
  imports: [DateComponent, NgIf, ConfirmComponent]
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

  @ViewChild(ConfirmComponent)
  confirmComponent!: ConfirmComponent;

  constructor(
    public authService: AuthService,
    private patientsService: PatientsService
  ) {}

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
    this.confirmComponent
      .show(`Unlock ${this.file.getTitle()}? All will have access to it.`)
      .then(() => {
        this.goMode(true);
      }, doNothing);
  }

  doDelete() {
    this.confirmComponent.show(`Delete ${this.file.getTitle()}?`).then(() => {
      if (!this.file.canDelete()) {
        throw new Error(`File can not be deleted: ${this.file.uuid}`);
      }
      this.patientsService.deleteFile(this.file);
      this.goMode(false);
    }, doNothing);
  }
}
