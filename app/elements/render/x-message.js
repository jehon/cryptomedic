
import { spacing } from '../../config.js';
import { createElementWith, defineCustomElement } from '../../js/custom-element.js';
import { toAttributeCase } from '../../js/string-utils.js';
import { levels } from '../../config.js';

/**
 * @typedef {object} Message a message for x-messages
 * @property {string} text to be shown
 * @property {string} [level] of the message
 * @property {string} [id] of the message
 */

/**
 * Slot[]: default
 */
export default class XMessage extends HTMLElement {
    /**
     * @param {string|Message} msg to be shown
     * @returns {XMessage} messageId
     */
    static buildMessage(msg) {
        if (typeof (msg) == 'string') {
            msg = { text: msg };
        }
        msg = {
            level: levels.danger,
            ...msg
        };

        return /** @type {XMessage} */ (createElementWith(XMessage, {
            'msg-id': msg.id,
            level: msg.level,

        }, msg.text));
    }

    static get observedAttributes() {
        return ['level'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(createElementWith('style', {}, `
    :host {
        display: block;
        box-sizing: border-box;
        width: 100%;
        margin-bottom: ${spacing.element};

        padding: calc(${spacing.text} * 3);
        text-align: center;

        border: 1px solid transparent;
        border-radius: 4px;

    }
`));
        this.shadowRoot.appendChild(createElementWith('slot'));
        this.refresh();
    }

    attributeChangedCallback(_attributeName, _oldValue, _newValue) {
        this.refresh();
    }

    get msgId() {
        return this.getAttribute('msg-id');
    }

    refresh() {
        const level = this.getAttribute('level');
        switch (level) {
            case '':
                break;
            case 'success':
                this.style.color = '#3c763d';
                this.style.backgroundColor = '#dff0d8';
                this.style.borderColor = '#d6e9c6';
                break;
            case 'info':
                this.style.color = '#004085';
                this.style.backgroundColor = '#cce5ff';
                this.style.borderColor = '#b8daff;';
                break;
            case 'warning':
                this.style.color = '#8a6d3b';
                this.style.backgroundColor = '#fcf8e3';
                this.style.borderColor = '#faebcc';
                break;
            case 'danger':
                this.style.color = '#a94442';
                this.style.backgroundColor = '#f2dede';
                this.style.borderColor = '#ebccd1;';
                break;
            default:
                console.info(toAttributeCase(XMessage.name) + ': Level not found: ', level);
        }
    }
}

defineCustomElement(XMessage);
