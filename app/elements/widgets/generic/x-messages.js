
import { levels } from '../../../config.js';
import { defineCustomElement } from '../../../js/custom-element.js';
import './x-message.js';

/**
 * @typedef {object} Message a message for x-messages
 * @property {string} text to be shown
 * @property {string} [level] of the message
 * @property {string} [id] of the message
 */

/**
 * Slot[]: content
 */
export default class XMessages extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.clear();
    }

    clear() {
        // TODO: use createElementWith

        this.shadowRoot.innerHTML = `
            <style>
                div#root {
                }
            </style>
            <div id='root'></div>
        `;
        this.root = this.shadowRoot.querySelector('div#root');
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
        if (typeof (msg) == 'string') {
            msg = { text: msg };
        }
        msg = {
            level: levels.danger,
            ...msg
        };
        this.root.insertAdjacentHTML('beforeend', `<x-message msg-id='${msg.id}' level='${msg.level}'>${msg.text}</x-message>`);
        return msg.id;
    }

    get messagesCount() {
        return this.root.querySelectorAll('x-message').length;
    }

    get messagesIds() {
        return new Set(Array.from(this.root.querySelectorAll('x-message')).map(e => e.getAttribute('msg-id')));
    }

}

defineCustomElement(XMessages);
