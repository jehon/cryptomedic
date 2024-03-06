import { stdDeviationFor } from "../../../../react/utils/standard-deviation.js";
import { fromBirthDateTo } from "../file/x-fff-age.js";
import XWithFile from "./x-with-file.js";

export default class XFffBmiSd extends XWithFile {
  formula() {
    const sd = stdDeviationFor(
      this.folder.getPatient().sexStr(),
      "bmi",
      fromBirthDateTo(this.folder.getPatient().year_of_birth, this.file.date),
      this.file.bmi()
    );

    return Math.round(sd * 10) / 10 + " ds";
  }
}

customElements.define("x-fff-bmi-sd", XFffBmiSd);
