
import { onSession, getAuthorized } from '../../../js/session.js';

// TODO: adapt to work with x-button

/**
 * Slot[]: content
 */
export default class XRestricted extends HTMLElement {
    static get observedAttributes() {
        return ['value', 'inverted'];
    }

    constructor() {
        super();
        /**@type {function} */
        this.unreg = null;
    }

    connectedCallback() {
        // Will fire immediately
        this.unreg = onSession(() => this.adapt());
    }

    disconnectedCallback() {
        /* istanbul ignore else */
        if (this.unreg) {
            this.unreg();
        }
        this.unreg = null;
    }

    attributeChangedCallback(attributeName, _oldValue, _newValue) {
        switch (attributeName) {
            case 'value':
            case 'inverted':
                this.adapt();
                break;
        }
    }

    getDisplayMode() {
        return 'inline-block';
    }

    adapt() {
        const authKey = this.getAttribute('value');
        this.active = false;
        if (authKey) {
            this.active = getAuthorized(authKey);
            if (this.hasAttribute('inverted')) {
                this.active = !this.active;
            }
        }
        if (this.active) {
            this.setAttribute('authorized', 'authorized');
            this.style.display = this.getDisplayMode();
        } else {
            this.removeAttribute('authorized');
            this.style.display = 'none';
        }
    }
}

window.customElements.define('x-restricted', XRestricted);
