import CRUD from "./crud.js";
import { getPref } from "../../../legacy/app-old/v2/js/prefs.js";

export default class FolderPage extends CRUD {
  initFromCachedPreferences() {
    var c = getPref("file", {
      examiner: "",
      center: "",
      date: ""
    });
    this.examiner = c.examiner;
    this.center = c.center;
    this.date = c.date;
  }

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

  getModel() {
    return this.constructor.name;
  }

  getServerRessource() {
    return this.getModel().toLowerCase() + "s";
  }

  getRelated() {
    return {};
  }
}
