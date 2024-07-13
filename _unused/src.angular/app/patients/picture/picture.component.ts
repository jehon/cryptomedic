import { NgClass } from "@angular/common";
import { Component, Input } from "@angular/core";
import { IoComponent } from "../../generic/io/io.component";
import Picture from "../business/picture";
import { FilePanelComponent } from "../file-panel/file-panel.component";

@Component({
  selector: "app-picture",
  standalone: true,
  imports: [FilePanelComponent, IoComponent, NgClass],
  templateUrl: "./picture.component.html",
  styleUrl: "./picture.component.css"
})
export class PictureComponent {
  @Input()
  file?: Picture;

  fullscreen: boolean = false;

  toggleFullscreen() {
    this.fullscreen = !this.fullscreen;
  }

  // // Legacy
  // validate(res) {
  //   res = super.validate(res);
  //   if (!this.fileContent && !this.file) {
  //     res.pictureRequired = true;
  //   }
  //   if (this.date > new Date().toISOString()) {
  //     res.dateInTheFuture = true;
  //   }
  //   return res;
  // }
}
