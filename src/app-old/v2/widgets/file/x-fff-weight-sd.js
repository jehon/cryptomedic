import XWithFile from "./x-with-file.js";
import { fromBirthDateTo } from "./x-fff-age.js";
import { defineCustomElement } from "../../../v2/js/custom-element.js";
import { stdDeviationFor } from "../../../v2/js/standard-deviation.js";

export default class XFffWeightSd extends XWithFile {
  formula() {
    const sd = stdDeviationFor(
      this.folder.getPatient().sexStr(),
      "Weightkg",
      fromBirthDateTo(this.folder.getPatient().Yearofbirth, this.file.Date),
      this.file.Weightkg
    );

    return Math.round(sd * 10) / 10 + " ds";
  }
}

defineCustomElement(XFffWeightSd);
