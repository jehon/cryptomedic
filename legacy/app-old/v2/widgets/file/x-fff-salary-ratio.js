import XWithFile from "./x-with-file.js";

export default class XFffSalaryRatio extends XWithFile {
  formula() {
    return Math.round(this.file.ratioSalary() * 100) / 100;
  }
}

customElements.define("x-fff-salary-ratio", XFffSalaryRatio);
