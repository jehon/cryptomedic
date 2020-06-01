
import { onSession, getAuthorized } from '../../js/session.js';

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
        this.attachShadow({ mode: 'open' });
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

    attributeChangedCallback(attributeName, oldValue, newValue) {
        switch (attributeName) {
            case 'value':
            case 'inverted':
                this.adapt();
                break;
        }
    }

    adapt() {
        const authKey = this.getAttribute('value');
        this.active = false;
        if (authKey) {
            this.active = getAuthorized(authKey);
        }
        if (this.hasAttribute('inverted')) {
            this.active = !this.active;
        }
        if (this.active) {
            this.shadowRoot.innerHTML = '<slot></slot>';
            this.setAttribute('authorized', 'authorized');
        } else {
            this.shadowRoot.innerHTML = '';
            this.removeAttribute('authorized');
        }
    }
}

window.customElements.define('x-restricted', XRestricted);
