import XWithFile from "./x-with-file.js";
import { stdDeviationFor } from "../../../../../src/utils/standard-deviation.js";

export default class XFffWhSd extends XWithFile {
  formula() {
    const sd = stdDeviationFor(
      this.folder.getPatient().sexStr(),
      "wh",
      this.file.height_cm,
      this.file.weight_kg
    );

    return Math.round(sd * 10) / 10 + " ds";
  }
}

customElements.define("x-fff-wh-sd", XFffWhSd);
