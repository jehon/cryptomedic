/* global JHElement */

'use strict';

(function() {
	const overlayDiv = Symbol('overlayDiv');

	class XOverlay extends JHElement {
		static get properties() {
			return {
				zIndex:   'Integer',
				closable: 'Boolean'
			};
		}

		constructor() {
			super();
			this.zIndex = 10;

			this.attachShadow({ mode: 'open' });
			this.shadowRoot.innerHTML = `
			<style>
				:host {
					position: relative;
				}

                #overlay[hidden] {
                    display: none !important;
                }

				#overlay {
				    position: fixed;
				    top: 0;
				    left: 0;
				    width: 100%;
				    height: 100%;
				    z-index: ${this._zIndex};

				    display: flex;
					flex-direction: column;
                    align-items: center; 
					justify-content: center;

				    background-color: rgba(0,0,0, 0.9); /* Black w/opacity */
				    overflow-x: hidden;
				    transition: 0.5s;
				}

				#close {
				    position: absolute;
				    top: 20px;
				    right: 45px;
				    font-size: 60px;
				}

				#close {
				    text-decoration: none;
				    color: #818181;
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
			this[overlayDiv] = this.shadowRoot.querySelector('#overlay');
			this.shadowRoot.querySelector('#close').addEventListener('click', () => this.free());
			this.free();
		}

		adapt() {
			let style = `z-index: ${this._zIndex}`;
			this.shadowRoot.querySelector('#close').style.display = ( this.closable ? 'block' : 'none' );
			this[overlayDiv].style = style;
		}

		block() {
			this[overlayDiv].removeAttribute('hidden');
		}

		free() {
			this[overlayDiv].setAttribute('hidden', 'hidden');
		}

		isBlocked() {
			return !this[overlayDiv].hasAttribute('hidden');
		}

		aroundPromise(p) {
			this.free();
			return p.catch((error) => {
				this.block();
				throw error;
			});
		}
	}

	window.customElements.define('x-overlay', XOverlay);
})();
