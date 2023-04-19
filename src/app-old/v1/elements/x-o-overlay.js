/* istanbul ignore file */

import JHElement from "./jh-element.js";

const overlayDiv = Symbol("overlayDiv");

export default class XOverlay extends JHElement {
  static get properties() {
    return {
      zIndex: "Integer",
      closable: "Boolean"
    };
  }

  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
			<style>
				:host {
					position: relative;
				}

				#overlay {
				    position: fixed;
				    top: 0;
				    left: 0;
				    width: 100%;
				    height: 100%;
				    z-index: 10;

				    display: flex;
					flex-direction: column;
                    align-items: center;
					justify-content: center;

				    background-color: rgba(0,0,0, 0.9); /* Black w/opacity */
				    overflow-x: hidden;
				    transition: 0.5s;
				}

                #overlay[hidden] {
                    display: none !important;
                }

				#close {
				    position: absolute;
				    top: 20px;
				    right: 45px;
				    font-size: 60px;
				    text-decoration: none;
                    color: #818181;
                    display: none;
				}

                :host([closable]) #close {
                    display: block;
                }

				#close:hover, #close:focus {
				    text-decoration: none;
				    color: #f1f1f1;
				}

				/* When the height of the screen is less than 450 pixels, change the font-size of the links and position the close button again, so they don't overlap */
				@media screen and (max-height: 450px) {
				    #close {
				        font-size: 40px;
				        top: 15px;
				        right: 35px;
				    }
                }
			</style>
			<div id="overlay">
				<a id='close' href="javascript:void(0)">&times;</a>
				<slot></slot>
			</div>
			`;
    this[overlayDiv] = this.shadowRoot.querySelector("#overlay");
    this.shadowRoot
      .querySelector("#close")
      .addEventListener("click", () => this.free());
    this.free();
  }

  block() {
    this[overlayDiv].removeAttribute("hidden");
  }

  free() {
    this[overlayDiv].setAttribute("hidden", "hidden");
  }

  isBlocked() {
    return !this[overlayDiv].hasAttribute("hidden");
  }

  aroundPromise(p) {
    this.free();
    return p.catch((error) => {
      this.block();
      throw error;
    });
  }
}

window.customElements.define("x-o-overlay", XOverlay);
