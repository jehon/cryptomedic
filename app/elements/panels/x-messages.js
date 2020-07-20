/** @module panels/x-messages */

import { spacing } from '../../config.js';
import { levels } from '../../config.js';
import { defineCustomElement } from '../../js/custom-element.js';

/**
 * @typedef {object} Message a message for x-messages
 * @property {string} text to be shown
 * @property {string} [level] of the message
 * @property {string} [icon] of the message
 * @property {string} [id] of the message
 */

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
     * @param {Array<string|Message>} list - the list of messages to be shown
     */
    showMessages(list) {
        this.clear();
        for (const msg of list) {
            this.addMessage(msg);
        }
    }

    /**
     * @param {string|Message} text to be shown
     * @param {string} level (danger, warning, success, info, primary, default)
     * @param {string} icon of the message
     * @param {string} id    technical id
     */
    addMessage(text, level = '', icon = '', id = '') {
        /** @type {Message} */
        let msg;

        if (typeof (text) == 'string') {
            msg = { text };
        } else {
            msg = text;
        }

        if (level) {
            msg.level = level;
        }

        if (icon) {
            msg.icon = icon;
        }

        if (id) {
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

defineCustomElement(XMessages);
