/* istanbul ignore file */

import JHElement from "./jh-element.js";

const overlay = Symbol("overlay");
const slot = Symbol("slot");

export default class XWaiting extends JHElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
            	<div id='overlay'>
            		<img src='/static/img/waiting.gif' />Loading
            	</div>
            	<span id='slot'>
            		<slot></slot>
            	</span>`;

    this[overlay] = this.shadowRoot.querySelector("#overlay");
    this[slot] = this.shadowRoot.querySelector("#slot");
    this.free();
  }

  render() {
    super.render();
    this.style.width = "100%";
    this.style.display = "inline";
  }

  block() {
    this[overlay].removeAttribute("hidden");
    this[slot].setAttribute("hidden", "hidden");
  }

  free() {
    this[overlay].setAttribute("hidden", "hidden");
    this[slot].removeAttribute("hidden");
  }

  isBlocked() {
    return !this[overlay].hasAttribute("hidden");
  }

  aroundPromise(p) {
    this.block();
    return p
      .then((data) => {
        this.free();
        return data;
      })
      .catch((error) => {
        this.free();
        throw error;
      });
  }
}

window.customElements.define("x-o-waiting", XWaiting);
