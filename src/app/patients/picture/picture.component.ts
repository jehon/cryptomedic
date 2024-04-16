import { Component, Input } from "@angular/core";
import { IoComponent } from "../../generic/io/io.component";
import Picture from "../business/picture";
import { FilePanelComponent } from "../file-panel/file-panel.component";

@Component({
  selector: "app-picture",
  standalone: true,
  imports: [FilePanelComponent, IoComponent],
  templateUrl: "./picture.component.html"
})
export class PictureComponent {
  @Input()
  file?: Picture;

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
