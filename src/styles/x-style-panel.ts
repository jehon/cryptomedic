import { MyWebComponent } from "./style-helpers";

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

          border: 1px solid rgba(0,0,0,.125);
          border-radius: 3px;

          gap: 20px;
        }

        label {
          background-color: rgba(0,0,0,.03);
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
