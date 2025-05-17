// https://legacy.reactjs.org/docs/web-components.html

import { createRoot } from "react-dom/client";

export function bridgeTo(tag: string, reactComponent: React.ReactNode) {
  const el = class extends HTMLElement {
    #mountPoint: HTMLElement;

    constructor() {
      super();
      this.#mountPoint = document.createElement("span");
      this.innerHTML = "";
      this.insertAdjacentElement("beforeend", this.#mountPoint);
    }

    connectedCallback() {
      createRoot(this.#mountPoint).render(reactComponent);
    }
  };

  customElements.define(tag, el);

  return el;
}
