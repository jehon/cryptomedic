import XWithFile from "./x-with-file.js";
import { defineCustomElement } from "../../js/custom-element.js";

export default class XFffBmi extends XWithFile {
  formula() {
    return Math.round(this.file.bmi() * 10) / 10;
  }
}

defineCustomElement(XFffBmi);
