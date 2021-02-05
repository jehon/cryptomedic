
import { createElementWith, defineCustomElement } from '../../js/custom-element.js';
import './x-message.js';
import XMessage from './x-message.js';

/**
 * Slot[]: content
 */
export default class XMessages extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(
            createElementWith('slot')
        );
    }

    clear() {
        this.innerHTML = '';
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
        const xmsg = XMessage.buildMessage(msg);
        this.appendChild(xmsg);
        return xmsg.msgId;
    }

    get messagesCount() {
        return this.querySelectorAll('x-message').length;
    }

    get messagesIds() {
        return new Set(Array.from(this.querySelectorAll('x-message')).map(e => e.getAttribute('msg-id')));
    }

}

defineCustomElement(XMessages);
