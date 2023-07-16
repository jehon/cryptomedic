// https://legacy.reactjs.org/docs/web-components.html

import React from "react";
import { createRoot } from "react-dom/client";

export function bridgeTo(
  tag: string,
  reactComponent: any,
  attributes: string[] = []
) {
  customElements.define(
    tag,
    class extends HTMLElement {
      connectedCallback() {
        const mountPoint = document.createElement("span");
        this.innerHTML = "";
        this.insertAdjacentElement("beforeend", mountPoint);
        // this.attachShadow({ mode: "open" }).appendChild(mountPoint);

        const attrs: any = {};
        for (const k of attributes) {
          attrs[k] = this.getAttribute(k) || "";
        }

        const root = createRoot(mountPoint);
        root.render(React.createElement(reactComponent, attrs));
      }
    }
  );
}
