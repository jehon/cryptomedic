import { stdDeviationFor } from "../../../../react/utils/standard-deviation.js";
import { fromBirthDateTo } from "./x-fff-age.js";
import XWithFile from "./x-with-file.js";

export default class XFffHeightSd extends XWithFile {
  formula() {
    const sd = stdDeviationFor(
      this.folder.getPatient().sexStr(),
      "height_cm",
      fromBirthDateTo(this.folder.getPatient().year_of_birth, this.file.date),
      this.file.height_cm
    );

    return Math.round(sd * 10) / 10 + " ds";
  }
}

customElements.define("x-fff-height-sd", XFffHeightSd);
