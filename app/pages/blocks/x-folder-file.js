import { defineCustomElement } from "../../js/custom-element.js";

export default class XFolderFile extends HTMLElement {
  _edit = false;

  constructor() {
    super();
    this.toggleAttribute("x-folder-file", true);

    if (location.hash.endsWith("/edit") || location.hash.endsWith("/Bill")) {
      this._edit = true;
    }
  }
}

defineCustomElement(XFolderFile);
