import XWithFile from "./x-with-file.js";
import { fromBirthDateTo } from "./x-fff-age.js";
import { defineCustomElement } from "../../js/custom-element.js";
import { stdDeviationFor } from "../../js/standard-deviation.js";

export default class XFffHeightSd extends XWithFile {
  formula() {
    const sd = stdDeviationFor(
      this.folder.getPatient().sexStr(),
      "Heightcm",
      fromBirthDateTo(this.folder.getPatient().Yearofbirth, this.file.Date),
      this.file.Heightcm
    );

    return Math.round(sd * 10) / 10 + " ds";
  }
}

defineCustomElement(XFffHeightSd);
