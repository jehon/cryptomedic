/* istanbul ignore file */

import { setCurrentFolder } from "../../../../src/utils/session.ts";
import Folder from "../../../business/folder.js";
import TimedMap from "../../v2/js/timedMap.js";
import nullify from "../nullify.js";
import XRequestor from "./x-o-requestor.js";

let patientFolderCache = new TimedMap(15 * 60);

export default class CryptomedicDataService extends XRequestor {
  /**************************/
  /*** Patient            ***/
  /**************************/

  getFolder(id) {
    setCurrentFolder();

    let f = patientFolderCache.get(id);
    if (f != null) {
      setCurrentFolder(f);
      return Promise.resolve(f);
    }

    return this.requestAndFilter({ url: `folder/Patient/${id}` }).then(
      (response) => {
        let f = new Folder(response.asJson.folder);
        setCurrentFolder(f);
        patientFolderCache.set(f.getId(), f);
        return f;
      }
    );
  }

  /**************************/
  /*** Patient - File     ***/
  /**************************/

  createOrSaveFile(data) {
    if (!data) {
      throw new Error("CryptomedicDataService: create or save null data");
    }
    if (data.id) {
      return this.saveFile(data);
    }
    return this.createFile(data);
  }

  createFile(data) {
    setCurrentFolder();
    if (!data) {
      throw new Error("CryptomedicDataService: create null data");
    }
    return this.requestAndFilter({
      url: "fiche/" + data.getServerRessource(),
      method: "POST",
      data: nullify(data)
    }).then((response) => {
      let f = new Folder(response.asJson.folder);
      f.setHeader("newKey", response.asJson.newKey);
      patientFolderCache.set(f.getId(), f);
      setCurrentFolder(f);
      return f;
    });
  }

  saveFile(data) {
    setCurrentFolder();
    if (!data) {
      throw new Error("CryptomedicDataService: save null data");
    }
    return this.requestAndFilter({
      url: "fiche/" + data.getServerRessource() + "/" + data["id"],
      method: "PUT",
      data: nullify(data)
    }).then((response) => {
      let f = new Folder(response.asJson.folder);
      patientFolderCache.set(f.getId(), f);
      setCurrentFolder(f);
      return f;
    });
  }

  deleteFile(data) {
    setCurrentFolder();
    if (!data) {
      throw new Error("CryptomedicDataService: delete null data");
    }
    return this.requestAndFilter({
      url: "fiche/" + data.getServerRessource() + "/" + data["id"],
      method: "DELETE"
    }).then((response) => {
      let f = new Folder(response.asJson.folder);
      patientFolderCache.set(f.getId(), f);
      setCurrentFolder(f);
      return f;
    });
  }

  unlockFile(data) {
    setCurrentFolder();
    if (!data) {
      throw new Error("CryptomedicDataService: unlock null data");
    }
    return this.requestAndFilter({
      url: "fiche/" + data.getServerRessource() + "/unlock/" + data["id"]
    }).then((response) => {
      let f = new Folder(response.asJson.folder);
      patientFolderCache.set(f.getId(), f);
      setCurrentFolder(f);
      return f;
    });
  }
}

window.customElements.define(
  "cryptomedic-data-service",
  CryptomedicDataService
);
