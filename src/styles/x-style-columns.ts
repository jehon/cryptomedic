export default class XStyleColumns extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.shadowRoot!.innerHTML = `
      <style>
        :host {
          display: flex;
          flex-direction: row;

          border: 1px solid rgba(0,0,0,.125);
          border-radius: 3px;

          gap: 20px;
        }
      </style>
      <slot></slot>
    `;

    this.shadowRoot!.querySelector(".header")?.addEventListener("click", () =>
      this.toggleAttribute("opened")
    );
  }
}

customElements.define("x-style-columns", XStyleColumns);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "x-style-columns": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}
