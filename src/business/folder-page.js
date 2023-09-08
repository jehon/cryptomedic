import CRUD from "./crud.js";

export default class FolderPage extends CRUD {
  isSet(field) {
    if (typeof this[field] == "undefined") {
      return false;
    }
    if (this[field] == null) {
      return false;
    }
    return true;
  }

  isNotZero(field) {
    if (!this.isSet(field)) {
      return false;
    }
    if (this[field] === 0) {
      return false;
    }
    return true;
  }

  isLocked() {
    return false;
  }

  getServerRessource() {
    return this.getModel().toLowerCase() + "s";
  }

  getRelated() {
    return {};
  }
}
