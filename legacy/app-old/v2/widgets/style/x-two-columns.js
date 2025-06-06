import { createElementWithTag } from "../../js/custom-element.js";
import { getPanelStyles } from "./x-panel.js";

class XTwoColumns extends HTMLElement {
  static get Tag() {
    return "x-two-columns";
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = "";
    this.shadowRoot.append(
      getPanelStyles(this.constructor.Tag),
      createElementWithTag(
        "style",
        {},
        `
                :host(x-two-columns) > div {
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    align-items: flex-start;
                    width: 100%;

                    margin-right: -15px;
                    margin-left: -15px;
                }

                ::slotted(*) {
                    flex-basis: 100%;
                    flex-grow: 0;
                    flex-shrink: 0;

                    max-width: 100%;
                    box-sizing: border-box;

                    padding-right: 15px;
                    padding-left: 15px;

                }

                @media (min-width: 768px) {
                    ::slotted(*) {
                        flex-basis: auto;
                        width: 50%;
                    }
                }
            `
      ),
      createElementWithTag("div", {}, [createElementWithTag("slot")])
    );
  }
}

customElements.define(XTwoColumns.Tag, XTwoColumns);
