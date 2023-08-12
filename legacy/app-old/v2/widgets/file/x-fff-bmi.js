import XWithFile from "./x-with-file.js";

export default class XFffBmi extends XWithFile {
  formula() {
    return Math.round(this.file.bmi() * 10) / 10;
  }
}

customElements.define("x-fff-bmi", XFffBmi);
