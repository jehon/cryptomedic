import XWithFile from "./x-with-file.js";

export default class XFffWh extends XWithFile {
  formula() {
    return Math.round(this.file.wh() * 100) / 100;
  }
}

customElements.define("x-fff-wh", XFffWh);
