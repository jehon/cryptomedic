import {
  createElementWithObject,
  createElementWithTag
} from "../../js/custom-element.js";
import { messages, spacing } from "../../../../../src/config.js";

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
    if (typeof msg == "string") {
      msg = { text: msg };
    }
    msg = {
      level: messages.error,
      ...msg
    };

    return /** @type {XMessage} */ (
      createElementWithObject(
        XMessage,
        {
          id: msg.id,
          "msg-id": msg.id,
          level: msg.level
        },
        msg.text
      )
    );
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.append(
      createElementWithTag(
        "style",
        {},
        `
    :host {
        display: block;
        box-sizing: border-box;
        width: 100%;
        padding: calc(${spacing.text} * 3);

        border: 1px solid transparent;
        border-radius: 4px;

        text-align: center;
    }

    :host > * {
        text-align: left;
    }

    :host(x-message:not([level])),
    :host(x-message[level="${messages.info}"])
    {
        color: #004085;
        background-color: #cce5ff;
        border-color: #b8daff;
    }

    :host(x-message[level="${messages.success}"]) {
        color: #3c763d;
        background-color: #dff0d8;
        border-color: #d6e9c6;
    }

    :host(x-message[level="${messages.warning}"]) {
        color: #8a6d3b;
        background-color: #fcf8e3;
        border-color: #faebcc;
    }

    :host(x-message[level="${messages.error}"]) {
        color: #a94442;
        background-color: #f2dede;
        border-color: #ebccd1;
    }

`
      ),
      createElementWithTag("slot")
    );
  }

  get msgId() {
    return this.getAttribute("msg-id");
  }
}

customElements.define("x-message", XMessage);
