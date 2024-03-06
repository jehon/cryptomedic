import { stdDeviationFor } from "../../../../react/utils/standard-deviation.js";
import XWithFile from "./x-with-file.js";

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
