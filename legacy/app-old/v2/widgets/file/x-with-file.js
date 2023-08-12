import XWithFolder from "../folder/x-with-folder.js";

const file = Symbol("file");

export default class XWithFile extends XWithFolder {
  constructor() {
    super();
    this.file = null;
  }

  get fileUid() {
    if (this.file) {
      return this.file.uid();
    }
    return "";
  }

  get file() {
    return this[file];
  }

  set file(f) {
    this[file] = f;
    if (f && f.uid()) {
      this.setAttribute("with-file", f.uid());
    } else {
      this.setAttribute("with-file", "null");
    }
    this.refresh();
  }

  isOk() {
    if (!super.isOk()) {
      return false;
    }
    return !!this.file;
  }

  refresh() {
    if (this.folder && !this.file && this.hasAttribute("file-uid")) {
      this.file = this.folder.getByUid(this.getAttribute("file-uid"));
    }
    super.refresh();
  }
}

customElements.define("x-with-file", XWithFile);
