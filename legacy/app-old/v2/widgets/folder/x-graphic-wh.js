/* istanbul ignore file: TODO */

import amd_stats from "../../../../react/utils/amd_stats.js";
import XGraphic from "./x-graphic.js";

class XGraphicWH extends XGraphic {
  getImageName() {
    return "wh";
  }
  getImageDimensions(sex) {
    return amd_stats.dimensions[`height_cm_weight_kg_${sex}`];
  }

  getVariableX() {
    return "Weight";
  }
  getVariableY() {
    return "Height";
  }

  getValueX(file) {
    return file.height_cm;
  }
  getValueY(file) {
    return file.weight_kg;
  }
}

window.customElements.define("x-graphic-wh", XGraphicWH);
