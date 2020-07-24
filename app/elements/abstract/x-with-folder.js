
import { defineCustomElement } from '../../js/custom-element.js';

const folder = Symbol('folder');

// TODO: remove dependency on XWaiting

export default class XWithFolder extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
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

        this.refresh();
    }

    /**
     * @returns {boolean} if all data are set
     */
    isOk() {
        return !!this.folder;
    }

    /**
     * Redraw the setup on data change, or on external call
     */
    refresh() {
        if (this.isOk()) {
            this.shadowRoot.innerHTML = '<slot></slot>';
            this.removeAttribute('blocked');
            this.adapt();
        } else {
            this.setAttribute('blocked', 'blocked');
            this.shadowRoot.innerHTML = '?';
        }
    }

    /**
     * Try to render the formula when data change.
     * Called by refresh only when data is present.
     */
    adapt() {
        try {
            this.removeAttribute('error');
            const val = this.formula();
            this.setAttribute('value', '' + val);
            this.innerHTML = `<span>${val}</span>`;
        } catch (e) {
            let msg = 'In error';
            if (typeof (e) == 'string') {
                msg = e;
            }

            if (e instanceof Error) {
                msg = e.message;
            }

            this.setAttribute('error', msg);
            this.removeAttribute('value');
            this.innerHTML = `<span>${msg}</span>`;
        }
    }

    /**
     * @returns {string|number} as the result of the calcul
     * @throws {import('../../js/exceptions.js').ApplicationException} when the calcul is not possible
     */
    formula() { return 'ok'; }
}

defineCustomElement(XWithFolder);
