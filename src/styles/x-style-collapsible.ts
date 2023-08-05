export default class XStyleCollapsible extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.shadowRoot!.innerHTML = `
      <style>
        :host {
          display: flex;
          flex-direction: column;

          width: calc(min(100%, 800px));
          margin: 0 auto;

          border: 1px solid rgba(0,0,0,.125);
          border-radius: 3px;

          gap: 20px;
        }

        :host > * {
          /* vertical horizontal */
          padding: .75rem 1.25rem;
        }

        .header {
          display: flex;
          flex-direction: row;
          justify-content: space-between;

          padding: 0.75em;

          background-color: rgba(0,0,0,.03);
        }

        .body {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 20px;

          border-bottom-left-radius: 2px;
          border-bottom-right-radius: 2px;
        }

        :host[opened] .header {
          border-bottom-left-radius: 0px;
          border-bottom-right-radius: 0px;
        }

        :host(:not([opened])) .body {
          display: none;
        }

        img, ::slotted(img) {
          height: 1.5em;
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

customElements.define("x-style-block", XStyleCollapsible);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "x-style-collabsible": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}
