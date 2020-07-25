/** @module panels/x-messages */

import { spacing } from '../../config.js';
import { levels } from '../../config.js';
import { defineCustomElement } from '../../js/custom-element.js';

/**
 * @typedef {object} Message a message for x-messages
 * @property {string} text to be shown
 * @property {string} [level] of the message
 * @property {string} [id] of the message
 */

let msgId = 0;

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
     * @param {string|Message} msg to be shown
     * @returns {string} messageId
     */
    addMessage(msg) {
        if (typeof(msg) == 'string') {
            msg = { text: msg };
        }
        msg = {
            level: levels.danger,
            ...msg
        };
        if (!('id' in msg)) {
            msg.id = '' + msgId++;
        }
        this.insertAdjacentHTML('beforeend', `<div class="alert alert-${msg.level}" id="${msg.id}">${msg.text}</div>`);
        return msg.id;
    }

    get messagesCount() {
        return this.querySelectorAll('div').length;
    }

    get messagesIds() {
        return new Set(Array.from(this.querySelectorAll('div')).map(e => e.getAttribute('id')));
    }

}

defineCustomElement(XMessages);
