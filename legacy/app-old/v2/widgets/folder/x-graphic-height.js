/* istanbul ignore file: TODO */

import amd_stats from "../../../../amd_stats.js";
import XGraphic from "./x-graphic.js";

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
