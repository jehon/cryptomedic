import XWithFile from "./x-with-file.js";
import { fromBirthDateTo } from "../file/x-fff-age.js";
import { defineCustomElement } from "../../js/custom-element.js";
import { stdDeviationFor } from "../../js/standard-deviation.js";

export default class XFffBmiSd extends XWithFile {
  formula() {
    const sd = stdDeviationFor(
      this.folder.getPatient().sexStr(),
      "bmi",
      fromBirthDateTo(this.folder.getPatient().year_of_birth, this.file.Date),
      this.file.bmi()
    );

    return Math.round(sd * 10) / 10 + " ds";
  }
}

defineCustomElement(XFffBmiSd);
