/* istanbul ignore file: TODO */

import XGraphic from "./x-graphic.js";
import amd_stats from "../../../../../src/utils/amd_stats.js";

class XGraphicHeight extends XGraphic {
  getImageName() {
    return "height";
  }
  getImageDimensions(sex) {
    return amd_stats.dimensions[`ageAtConsultTime_height_cm_${sex}`];
  }

  getVariableY() {
    return "Height";
  }

  getValueY(file) {
    return file.height_cm;
  }
}

window.customElements.define("x-graphic-height", XGraphicHeight);
