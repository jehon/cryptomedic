
import { defineCustomElement } from '../../js/custom-element.js';
import XWithFolder from './x-with-folder.js';

const fileUid = Symbol('file');


export default class XWithFile extends XWithFolder {
    constructor() {
        super();
        this.fileUid = null;
    }

    get fileUid() {
        return this[fileUid];
    }

    set fileUid(f) {
        this[fileUid] = f;
        this.setAttribute('with-file-uid', f ?? 'null');
        this.refresh();
    }

    get file() {
        if (!this.folder) {
            return null;
        }
        if (!this.fileUid) {
            return null;
        }
        return this.folder.getByUid(this.fileUid);
    }

    isOk() {
        return !!this.file;
    }
}

defineCustomElement(XWithFile);
