import { stdDeviationFor } from "../../../../standard-deviation.js";
import { fromBirthDateTo } from "./x-fff-age.js";
import XWithFile from "./x-with-file.js";

export default class XFffWeightSd extends XWithFile {
  formula() {
    const sd = stdDeviationFor(
      this.folder.getPatient().sexStr(),
      "weight_kg",
      fromBirthDateTo(this.folder.getPatient().year_of_birth, this.file.date),
      this.file.weight_kg
    );

    return Math.round(sd * 10) / 10 + " ds";
  }
}

customElements.define("x-fff-weight-sd", XFffWeightSd);
