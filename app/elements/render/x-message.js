
import { spacing } from '../../config.js';
import { createElementWithObject, createElementWithTag, defineCustomElement } from '../../js/custom-element.js';
import { toAttributeCase } from '../../js/string-utils.js';
import { messages, colors } from '../../config.js';

/**
 * @typedef {object} Message a message for x-messages
 * @property {string} text to be shown
 * @property {string} [level] of the message
 * @property {string} [id] of the message
 */

/**
 * Properties:
 * - level
 * - msg-id (exported): of the message
 *
 * Slots:
 * - <default>: the message
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
            level: messages.error,
            ...msg
        };

        return /** @type {XMessage} */ (createElementWithObject(XMessage, {
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
        this.shadowRoot.append(
            createElementWithTag('style', {}, `
    :host {
        display: block;
        box-sizing: border-box;
        width: 100%;
        padding: calc(${spacing.text} * 3);

        border: 1px solid transparent;
        border-radius: 4px;

        text-align: center;
    }
`),
            createElementWithTag('slot')
        );
        this.adapt();
    }

    attributeChangedCallback(_attributeName, _oldValue, _newValue) {
        this.adapt();
    }

    get msgId() {
        return this.getAttribute('msg-id');
    }

    adapt() {
        let level = this.getAttribute('level');
        if (!level) {
            level = messages.error;
        }
        if (!(level in colors.messages)) {
            console.info(toAttributeCase(XMessage.name) + ': Level not found: ', level);
            return;
        }
        const styling = colors.messages[level];

        for (const k of Object.keys(styling)) {
            this.style[k] = styling[k];
        }
    }
}

defineCustomElement(XMessage);
