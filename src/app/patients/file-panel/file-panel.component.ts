import { NgIf } from "@angular/common";
import {
  Component,
  ContentChildren,
  HostBinding,
  Input,
  OnInit,
  QueryList,
  ViewChild
} from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
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

  @HostBinding("attr.data-opened")
  statusOpened: boolean = false;

  @HostBinding("attr.data-edit")
  editMode: boolean = false;

  view: string = "undefined";

  // To get info in ngContent
  // @ContentChild(IoComponent) ioList!: QueryList<IoComponent>;
  @ContentChildren(IoComponent, { descendants: true })
  ioList!: QueryList<IoComponent>;

  @ViewChild(ConfirmComponent)
  confirmComponent!: ConfirmComponent;

  constructor(
    public authService: AuthService,
    private router: Router,
    private patientsService: PatientsService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    /*
      !!! We use the HASH to enable the mode on this page
      available modes:
         <empty>      => patient (isTop)
         <uuid>       => read mode on uuid
         <uuid>|edit  => edit mode
    */

    // So easier than the Angular way of it... but no auto refresh :=/
    this.view = window.location.hash.substring(1);
    const viewParameters = decodeURIComponent(this.view).split("|");
    if (viewParameters[0] == "") {
      if (this.file.isTop()) {
        this.statusOpened = true;
      }
    } else if (viewParameters[0] == this.file.uuid) {
      this.statusOpened = true;
      if (viewParameters[1] == "edit") {
        this.editMode = true;
      }
    }

    if (this.model == constants.models["patient"].name && this.view == "") {
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
      .then(async () => {
        await this.patientsService.unlockFile(this.file);
        this.goMode(true);
        this.toastr.success(`File ${this.file.getTitle()} unlocked`);
      }, doNothing);
  }

  doDelete() {
    this.confirmComponent
      .show(`Delete ${this.file.getTitle()}?`)
      .then(async () => {
        const result = await this.patientsService.deleteFile(this.file);
        this.toastr.success(`File ${this.file.getTitle()} deleted`);

        if (!result) {
          // If delete patient -> go home afterward
          this.router.navigate(["/patients"]);
        } else {
          // Otherwise exit edit mode
          this.goMode(false);
        }
      }, doNothing);
  }
}
