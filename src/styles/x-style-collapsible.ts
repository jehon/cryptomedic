import { MyWebComponent, defaultWidthScreen } from "./style-helpers";

export default class XStyleCollapsible extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.shadowRoot!.innerHTML = `
      <style>
        :host {
          display: flex;
          flex-direction: column;

          width: ${defaultWidthScreen};
          margin: 0 auto;

          box-sizing: border-box;
          border: 1px solid rgba(0,0,0,.125);
          border-radius: 3px;

          gap: 20px;
        }

        :host > * {
          /* vertical horizontal */
          padding: 5px;
        }

        .header {
          display: flex;
          flex-direction: row;
          justify-content: space-between;

          padding: 0.75em;

          background-color: rgba(0,0,0,.03);
        }

        img, ::slotted(img) {
          height: 1.5em;
        }

        .body {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 20px;
        }

        :host(:not([opened])) .body {
          display: none;
        }

      </style>
      <div class="header">
        <slot name="header"></slot>
        <img src="/static/img/view.svg" class="inline" alt="View" />
      </div>
      <div class="body">
        <slot></slot>
      </div>
    `;

    this.shadowRoot!.querySelector(".header")?.addEventListener("click", () =>
      this.toggleAttribute("opened")
    );
  }
}

customElements.define("x-style-collabsible", XStyleCollapsible);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "x-style-collabsible": MyWebComponent<XStyleCollapsible> & {
        opened?: string;
      };
    }
  }
}
