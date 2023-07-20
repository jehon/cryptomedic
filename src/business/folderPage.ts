// import S from "string";

import CRUD from "../utils/crud";
// import { getPref } from "../js/prefs.js";

export default class FolderPage extends CRUD {
  /**
   * Return an unique id for this file
   * based on file type and id
   *
   * TODO: should include patient_id ?
   *
   * @returns {string} an unique id
   */

  // initFromCachedPreferences() {
  //   var c = getPref("file", {
  //     examinerName: "",
  //     center: "",
  //     date: ""
  //   });
  //   this.ExaminerName = c.examinerName;
  //   this.Center = c.center;
  //   this.Date = c.date;
  // }

  // isLocked(): boolean {
  //   return false;
  // }

  getServerRessource(): string {
    return this.getModel().toLowerCase() + "s";
  }

  // getRelated(): any {
  //   return {};
  // }
}
