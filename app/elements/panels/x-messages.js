
import { spacing } from '../../config.js';
import { levels } from '../../config.js';

/**
 * Slot[]: content
 */
export default class XMessages extends HTMLElement {
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

    /**
     *
     * @param {string|obj}* msg
     * @param string level (danger, warning, success, info, primary, default)
     * @param string icon
     */
    addMessage(msg, level = false, icon = false) {
        if (typeof (msg) == 'string') {
            msg = { text: msg };
        }

        if (level !== false) {
            msg.level = level;
        }

        if (icon !== false) {
            msg.icon = icon;
        }

        msg = {
            level: levels.danger,
            ...msg
        };
        this.insertAdjacentHTML('beforeend', `<div class="alert alert-${msg.level}">${msg.text}</div>`);
    }
}

window.customElements.define('x-messages', XMessages);
