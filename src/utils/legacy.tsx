// https://legacy.reactjs.org/docs/web-components.html

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { isFeatureSwitchEnabled } from "../config";

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
      if (isFeatureSwitchEnabled(/* Strict mode */))
        createRoot(this.#mountPoint).render(
          <StrictMode>{reactComponent}</StrictMode>
        );
      else createRoot(this.#mountPoint).render(reactComponent);
    }
  };

  customElements.define(tag, el);

  return el;
}
