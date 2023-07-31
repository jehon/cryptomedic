import XWithFile from "./x-with-file.js";
import { defineCustomElement } from "../../js/custom-element.js";
import { stdDeviationFor } from "../../js/standard-deviation.js";

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

defineCustomElement(XFffWhSd);
