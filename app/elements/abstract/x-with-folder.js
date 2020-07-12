
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

    /**
     * @returns {string|number} as the result of the calcul
     * @throws {import('../../js/exceptions.js').ApplicationException} when the calcul is not possible
     */
    formula() { return 'ok'; }

    adapt() {
        try {
            this.removeAttribute('error');
            this.innerHTML = `<span slot='content'>${this.formula()}</span>`;
        } catch (e) {
            let msg = 'In error';
            if (typeof (e) == 'string') {
                msg = e;
            }

            if (e instanceof Error) {
                msg = e.message;
            }

            this.setAttribute('error', msg);
            this.innerHTML = `<span slot='content'>${msg}</span>`;
        }
    }
}

defineCustomElement(XWithFolder);
