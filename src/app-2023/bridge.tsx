// https://legacy.reactjs.org/docs/web-components.html

import React from "react";
import { Root, createRoot } from "react-dom/client";

export function bridgeTo(
  tag: string,
  reactComponent: any,
  attributes: string[] = []
) {
  customElements.define(
    tag,
    class extends HTMLElement {
      #element: any
      #root: Root

      static get observedAttributes() {
        return attributes;
      }

      constructor() {
        super();
        const mountPoint = document.createElement("span");
        this.innerHTML = "";
        this.insertAdjacentElement("beforeend", mountPoint);
        // this.attachShadow({ mode: "open" }).appendChild(mountPoint);

        this.#root = createRoot(mountPoint);
      }

      connectedCallback() {
        this.render();
      }

      attributeChangedCallback(attributeName: string, oldValue: string, newValue: string) {
        this.render();
      }

      render() {
        const attrs: any = {};
        for (const k of attributes) {
          attrs[k] = this.getAttribute(k) || "";
        }
        this.#element = React.createElement(reactComponent, attrs);
        this.#root.render(this.#element);
      }
    }
  );
}
