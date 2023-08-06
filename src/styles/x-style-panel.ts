import { MyWebComponent, defaultWidthBox } from "./style-helpers";

export default class XStylePanel extends HTMLElement {
  label?: string;

  connectedCallback() {
    this.label = this.getAttribute("label") ?? "Label";
    this.attachShadow({ mode: "open" });
    this.shadowRoot!.innerHTML = `
      <style>
        :host {
          display: flex;
          flex-direction: column;
          margin: 10px;

          box-sizing: border-box;
          border: 1px solid rgba(0,0,0,.125);
          border-radius: 3px;
        }

        :host > * {
          /* vertical horizontal */
          padding: .75rem 1.25rem;
        }

        label {
          background-color: rgba(0,0,0,.03);
        }

        label img, label ::slotted(img) {
          height: 1.5em;
        }
      </style>
      <label>${this.label}</label>
      <slot></slot>
    `;

    this.shadowRoot!.querySelector(".header")?.addEventListener("click", () =>
      this.toggleAttribute("opened")
    );
  }
}

customElements.define("x-style-panel", XStylePanel);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "x-style-panel": MyWebComponent<XStylePanel>;
    }
  }
}
