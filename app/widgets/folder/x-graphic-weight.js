/* istanbul ignore file: TODO */

import XGraphic from "./x-graphic.js";
import amd_stats from "../../js/amd_stats.js";

export default class XGraphicWeight extends XGraphic {
  getImageName() {
    return "weight";
  }
  getImageDimensions(sex) {
    return amd_stats.dimensions[`ageAtConsultTime_Weightkg_${sex}`];
  }

  getVariableY() {
    return "Weight";
  }

  getValueY(file) {
    return file.Weightkg;
  }
}

window.customElements.define("x-graphic-weight", XGraphicWeight);
