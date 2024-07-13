/* istanbul ignore file: TODO */

import amd_stats from "../../../../../src/utils/amd_stats.js";
import XGraphic from "./x-graphic.js";

class XGraphicBMI extends XGraphic {
  getImageName() {
    return "bmi";
  }
  getImageDimensions(sex) {
    return amd_stats.dimensions[`ageAtConsultTime_bmi_${sex}`];
  }

  getVariableY() {
    return "BMI";
  }

  getValueY(file) {
    try {
      return file.bmi();
    } catch (_e) {
      return NaN;
    }
  }
}

window.customElements.define("x-graphic-bmi", XGraphicBMI);
