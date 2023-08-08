/* istanbul ignore file */

import FolderPage from "../../../../src/app-folder/business/folder-page.js";

export default class Payment extends FolderPage {
  getModel() {
    return "Payment";
  }
}
