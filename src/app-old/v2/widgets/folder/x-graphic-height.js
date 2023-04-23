/* istanbul ignore file: TODO */

import XGraphic from "./x-graphic.js";
import amd_stats from "../../js/amd_stats.js";

class XGraphicHeight extends XGraphic {
  getImageName() {
    return "height";
  }
  getImageDimensions(sex) {
    return amd_stats.dimensions[`ageAtConsultTime_Heightcm_${sex}`];
  }

  getVariableY() {
    return "Height";
  }

  getValueY(file) {
    return file.Heightcm;
  }
}

window.customElements.define("x-graphic-height", XGraphicHeight);
