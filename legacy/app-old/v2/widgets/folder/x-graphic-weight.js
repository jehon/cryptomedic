/* istanbul ignore file: TODO */

import amd_stats from "../../../../amd_stats.js";
import XGraphic from "./x-graphic.js";

export default class XGraphicWeight extends XGraphic {
  getImageName() {
    return "weight";
  }
  getImageDimensions(sex) {
    return amd_stats.dimensions[`ageAtConsultTime_weight_kg_${sex}`];
  }

  getVariableY() {
    return "Weight";
  }

  getValueY(file) {
    return file.weight_kg;
  }
}

window.customElements.define("x-graphic-weight", XGraphicWeight);
