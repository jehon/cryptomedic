
import { defineCustomElement } from '../../js/custom-element.js';
import XWaiting from '../panels/x-waiting.js';

const folder = Symbol('folder');

export default class XWithFolder extends XWaiting {
    constructor() {
        super();
        this.folder = null;
    }

    get folder() {
        return this[folder];
    }

    set folder(f) {
        this[folder] = f;
        if (f) {
            this.setAttribute('with-folder', f.getId());
        } else {
            this.setAttribute('with-folder', 'null');
        }

        this._onAdapt();
    }

    isOk() {
        return this.folder;
    }

    _onAdapt() {
        if (this.isOk()) {
            this.free();
            this.adapt();
        } else {
            this.block();
        }
    }

    adapt() { }
}

defineCustomElement(XWithFolder);
