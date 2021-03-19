
/* istanbul ignore file */

import XRequestor from './x-requestor.js';
import TimedMap from '../js/timedMap.js';
import Folder from '../models/Folder.js';
import nullify from '../js/nullify.js';
import { setCurrentFolder } from '../js/session.js';

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

        return this.requestAndFilter({ url: `folder/Patient/${id}` })
            .then(response => {
                let f = new Folder(response.asJson.folder);
                setCurrentFolder(f);
                patientFolderCache.set(f.getId(), f);
                return f;
            });
    }

    /**************************/
    /*** Patient - File     ***/
    /**************************/

    createOrSaveFile(data) {
        if (data.id) {
            return this.saveFile(data);
        }
        return this.createFile(data);
    }

    createFile(data) {
        setCurrentFolder();
        return this.requestAndFilter({ url: 'fiche/' + data.getServerRessource(), method: 'POST', data: nullify(data) })
            .then(response => {
                let f = new Folder(response.asJson.folder);
                f.setHeader('newKey', response.asJson.newKey);
                patientFolderCache.set(f.getId(), f);
                setCurrentFolder(f);
                return f;
            });
    }

    saveFile(data) {
        setCurrentFolder();
        return this.requestAndFilter({ url: 'fiche/' + data.getServerRessource() + '/' + data['id'], method: 'PUT', data: nullify(data) })
            .then(response => {
                let f = new Folder(response.asJson.folder);
                patientFolderCache.set(f.getId(), f);
                setCurrentFolder(f);
                return f;
            });
    }

    deleteFile(data) {
        setCurrentFolder();
        return this.requestAndFilter({ url: 'fiche/' + data.getServerRessource() + '/' + data['id'], method: 'DELETE' })
            .then(response => {
                let f = new Folder(response.asJson.folder);
                patientFolderCache.set(f.getId(), f);
                setCurrentFolder(f);
                return f;
            });
    }

    unlockFile(data) {
        setCurrentFolder();
        return this.requestAndFilter({ url: 'fiche/' + data.getServerRessource() + '/unlock/' + data['id'] })
            .then(response => {
                let f = new Folder(response.asJson.folder);
                patientFolderCache.set(f.getId(), f);
                setCurrentFolder(f);
                return f;
            });
    }

    /***********************/
    /*** User management ***/
    /***********************/

    usersList() {
        return this.requestAndFilter({ url: 'users' })
            .then(response => response.asJson);
    }
}

window.customElements.define('cryptomedic-data-service', CryptomedicDataService);
