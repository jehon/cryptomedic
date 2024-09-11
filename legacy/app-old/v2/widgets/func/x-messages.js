import { spacing } from "../../../../config.js";
import { createElementWithTag } from "../../js/custom-element.js";
import "../style/x-message.js";
import XMessage from "../style/x-message.js";
import { getPanelStyles } from "../style/x-panel.js";

/**
 * @typedef {import('../style/x-message.js').Message} Message
 */

/**
 * Slot[]: content
 */
export default class XMessages extends HTMLElement {
  static get Tag() {
    return "x-messages";
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.append(
      getPanelStyles(this.constructor.Tag, true),
      createElementWithTag(
        "style",
        {},
        `
    ::slotted(*) {
        margin-bottom: ${spacing.element};
    }
            `
      ),
      createElementWithTag("slot")
    );
  }

  clear() {
    this.innerHTML = "";
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
    this.append(xmsg);
    return xmsg.msgId;
  }

  get messagesCount() {
    return this.querySelectorAll("x-message").length;
  }

  get messagesIds() {
    return new Set(
      Array.from(this.querySelectorAll("x-message")).map((e) =>
        e.getAttribute("msg-id")
      )
    );
  }
}

customElements.define(XMessages.Tag, XMessages);
