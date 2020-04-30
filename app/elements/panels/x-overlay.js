
import XPanel from './x-panel.js';
import { insertInSlotDefault } from '../element-helpers.js';

/**
 * Slot[content]: content
 * Slot[overlay]: overlay
 */
export default class XOverlay extends XPanel {
    constructor() {
        super();
        insertInSlotDefault(this, `
            <style css-inherit-local>
                #overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 10;
                    color: white;

                    background-color: rgba(0.3,0.3,0.3, 0.8); /* Black w/opacity */
                    overflow-x: hidden;
                    transition: 0.5s;
                    display: inline;
                }

                #overlay > slot, #overlay > span[slot-overlay] {
                    background-color: rgba(0,0,0, 1); /* Black w/opacity */
                    padding: 10px;
                    border-radius: 10px;
                }

                /* Mode free */

                :host #overlay {
                    display: none;
                }

                /* Mode blocked */

                :host([blocked]) #overlay {
                    display: block;
                }

                :host([global]) #overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                }

                /* Close button */

				:host #close {
					display: none;
				}

				:host([closable]) #close {
                    display: block;
                }

				#close {
				    position: absolute;
				    top: 20px;
				    right: 45px;
				    font-size: 60px;

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
            <slot name='content'></slot>
            <x-panel id='overlay'>
                <a id='close' href="javascript:void(0)">&times;</a>
                <slot name='overlay'></slot>
            </x-panel>
			`);

        this.shadowRoot.querySelector('#close').addEventListener('click', () => this.free());
    }

    block() {
        this.setAttribute('blocked', 'blocked');
    }

    free() {
        this.removeAttribute('blocked');
    }

    isBlocked() {
        return this.hasAttribute('blocked');
    }
}

window.customElements.define('x-overlay', XOverlay);
