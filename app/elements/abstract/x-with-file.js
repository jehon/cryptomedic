
import { defineCustomElement } from '../../js/custom-element.js';
import XWithFolder from './x-with-folder.js';

const file = Symbol('file');


export default class XWithFile extends XWithFolder {
    constructor() {
        super();
        this.file = null;
    }

    get fileUid() {
        if (this.file) {
            return this.file.uid();
        }
        return '';
    }

    get file() {
        return this[file];
    }

    set file(f) {
        this[file] = f;
        if (f && f.uid()) {
            this.setAttribute('with-file', f.uid());
        } else {
            this.setAttribute('with-file', 'null');
        }
        this.refresh();
    }

    isOk() {
        return !!this.file;
    }
}

defineCustomElement(XWithFile);
