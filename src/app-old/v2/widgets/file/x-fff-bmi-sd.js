import XWithFile from "./x-with-file.js";
import { fromBirthDateTo } from "../file/x-fff-age.js";
import { defineCustomElement } from "../../../v2/js/custom-element.js";
import { stdDeviationFor } from "../../../v2/js/standard-deviation.js";

export default class XFffBmiSd extends XWithFile {
  formula() {
    const sd = stdDeviationFor(
      this.folder.getPatient().sexStr(),
      "bmi",
      fromBirthDateTo(this.folder.getPatient().Yearofbirth, this.file.Date),
      this.file.bmi()
    );

    return Math.round(sd * 10) / 10 + " ds";
  }
}

defineCustomElement(XFffBmiSd);
