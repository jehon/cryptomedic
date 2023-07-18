/* istanbul ignore file: TODO */

import XGraphic from "./x-graphic.js";
import amd_stats from "../../js/amd_stats.js";

class XGraphicWH extends XGraphic {
  getImageName() {
    return "wh";
  }
  getImageDimensions(sex) {
    return amd_stats.dimensions[`Heightcm_Weightkg_${sex}`];
  }

  getVariableX() {
    return "Weight";
  }
  getVariableY() {
    return "Height";
  }

  getValueX(file) {
    return file.Heightcm;
  }
  getValueY(file) {
    return file.Weightkg;
  }
}

window.customElements.define("x-graphic-wh", XGraphicWH);
