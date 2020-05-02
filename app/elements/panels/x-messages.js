
import { spacing } from '../../config.js';

/**
 * Slot[]: content
 */
export default class XMessages extends HTMLElement {
    static get observedAttributes() {
        return ['icon'];
    }

    constructor() {
        super();
        this.clear();
    }

    clear() {
        this.innerHTML = `
            <style>
                x-messages {
                    padding: ${spacing.element};
                }
            </style>
        `;
    }

    /**
     *
     * @param {Array[string]} list
     */
    showMessages(list) {
        this.clear();
        for (const msg of list) {
            this.addMessage(msg);
        }
    }

    addMessage(msg) {
        if (typeof (msg) == 'string') {
            msg = { text: msg };
        }

        msg = {
            level: 'danger',
            ...msg
        };
        this.insertAdjacentHTML('beforeend', `<div class="alert alert-${msg.level}">${msg.text}</div>`);

    }
}

window.customElements.define('x-messages', XMessages);
