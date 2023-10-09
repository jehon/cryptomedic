// https://legacy.reactjs.org/docs/web-components.html

import React from "react";
import { Root, createRoot } from "react-dom/client";
import { ObjectMap } from "./utils/generic-types";

export function bridgeTo(
  tag: string,
  reactComponent: any,
  hardcodedAttributes: { [x: string]: any } = {},
  transferedAttributes: string[] = []
) {
  customElements.define(
    tag,
    class extends HTMLElement {
      #element: any;
      #root: Root;
      #props: ObjectMap<any> = {};

      static get observedAttributes() {
        return transferedAttributes;
      }

      constructor() {
        super();
        const mountPoint = document.createElement("span");
        this.innerHTML = "";
        this.insertAdjacentElement("beforeend", mountPoint);

        this.#root = createRoot(mountPoint);
      }

      connectedCallback() {
        this.render();
      }

      attributeChangedCallback(
        attributeName: string,
        oldValue: string,
        newValue: string
      ) {
        this.render();
      }

      set(attr: string, value: any) {
        this.#props[attr] = value;
        this.render();
      }

      render() {
        const attrs: any = {};
        for (const k of transferedAttributes) {
          attrs[k] = this.getAttribute(k) || "";
        }
        this.#element = React.createElement(reactComponent, {
          ...attrs,
          ...hardcodedAttributes,
          ...this.#props
        });
        this.#root.render(this.#element);
      }

      // //
      // // For ctrl_folder
      // //

      // set folder(f: any) {
      //   this.set("folder", f);
      //   this.render();
      // }

      // set file(f: any) {
      //   this.set("file", f);
      //   this.render();
      // }
    }
  );
}
