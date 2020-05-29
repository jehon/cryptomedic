/** @module panels/x-messages */

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
                    width: 100%;
                    text-align: center;
                }
            </style>
        `;
    }

    /**
     *
     * @param {Array<string>} list
     */
    showMessages(list) {
        this.clear();
        for (const msg of list) {
            this.addMessage(msg);
        }
    }

    /**
     *
     * @param {string|any} msg
     * @param {string|boolean} level (danger, warning, success, info, primary, default)
     * @param {string|boolean} icon
     * @param {string|boolean} id    technical id
     */
    addMessage(msg, level = false, icon = false, id = false) {
        if (typeof (msg) == 'string') {
            msg = { text: msg };
        }

        if (level !== false) {
            msg.level = level;
        }

        if (icon !== false) {
            msg.icon = icon;
        }

        if (id !== false) {
            msg.id = id;
        }

        msg = {
            level: levels.danger,
            id: '',
            ...msg
        };
        this.insertAdjacentHTML('beforeend', `<div class="alert alert-${msg.level}" id="${msg.id}">${msg.text}</div>`);
    }

    get messagesCount() {
        return this.querySelectorAll('div').length;
    }

    get messagesIds() {
        return new Set(Array.from(this.querySelectorAll('div')).map(e => e.getAttribute('id')));
    }

}

window.customElements.define('x-messages', XMessages);
