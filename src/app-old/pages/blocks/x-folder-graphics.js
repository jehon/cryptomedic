import "../../widgets/folder/x-graphic-height.js";
import "../../widgets/folder/x-graphic-weight.js";
import "../../widgets/folder/x-graphic-bmi.js";
import "../../widgets/folder/x-graphic-wh.js";
import { defineCustomElement } from "../../js/custom-element.js";

/**
 */
export default class XFolderGraphics extends HTMLElement {
  constructor() {
    // TODO: use createElementWith

    super();
    this.innerHTML = `
        <div id='headerContainer' class='headerContainer'></div>
        <div class='container-fluid' align='center'>
            <div class='row'>
                <div class="col-lg-6">
                    <x-graphic-weight></x-graphic-weight>
                    <x-graphic-height></x-graphic-height>
                </div>
                <div class="col-lg-6">
                    <x-graphic-wh></x-graphic-wh>
                    <x-graphic-bmi></x-graphic-bmi>
                </div>
            </div>
        </div>
    `;
  }
}

defineCustomElement(XFolderGraphics);
