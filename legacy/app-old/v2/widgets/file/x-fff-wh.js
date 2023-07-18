import XWithFile from "./x-with-file.js";
import { defineCustomElement } from "../../js/custom-element.js";

export default class XFffWh extends XWithFile {
  formula() {
    return Math.round(this.file.wh() * 100) / 100;
  }
}

defineCustomElement(XFffWh);
