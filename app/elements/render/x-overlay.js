
import XPanel, { getPanelStyles } from './x-panel.js';
import { createElementWithObject, createElementWithTag, defineCustomElement, isEventOutOfSlot } from '../../js/custom-element.js';
import XForm from '../funcs/x-form.js';

/**
 * Slot[]: content to be shown in the panel
 * Slot[overlay]: overlay to be put on top when blocked
 */
export default class XOverlay extends HTMLElement {

    /** @type {HTMLSlotElement} */
    _overlaySlot

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.append(
            getPanelStyles(this, true),
            createElementWithTag('style', { 'css-inherit-local': true }, `
    :host {
        padding: 0px;
    }

    x-panel#overlay {
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

        display: none;
    }

    x-panel#overlay > slot, x-panel#overlay > span[slot-overlay] {
        background-color: rgba(0,0,0, 1); /* Black w/opacity */
        padding: 10px;
        border-radius: 10px;
    }

    x-panel#overlay > #close {
        position: absolute;
        top: 20px;
        right: calc(0px + 2em);

        background-color: transparent;
        border: none;
        color: white;
        font-size: large;
        font-weight: bold;

        height: 2em;
        width: 2em;
        border-radius: 1em;
        text-decoration: none;

        display: none;
    }

    x-panel#overlay > #close:hover, x-panel#overlay > #close:focus {
        background-color: lightgray;
    }

    /*
     * Custom styles
     */

    :host([blocked]) x-panel#overlay {
        display: block;
    }

    :host([global]) x-panel#overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    :host([closable]) x-panel#overlay > #close {
        display: block;
    }

    /* When the height of the screen is less than 450 pixels, change the font-size of the links and position the close button again, so they don't overlap */
    @media screen and (max-height: 450px) {
        #close {
            font-size: 40px;
            top: 15px;
            right: 35px;
        }
    }
`
            ),
            createElementWithObject(XPanel, { id: 'overlay' }, [
                createElementWithTag('button', { id: 'close' }, '✕',
                    (el) => el.addEventListener('click', () => this.free())
                ),
                this._overlaySlot = /** @type {HTMLSlotElement} */ (createElementWithTag('slot', { name: 'overlay' }))
            ]),
            document.createElement('slot')
        );

        this.addEventListener(XForm.ActionCancel, (evt) => this._freeOnEvent(evt));
        this.addEventListener(XForm.ActionDelete, (evt) => this._freeOnEvent(evt));
        this.addEventListener(XForm.ActionReset, (evt) => this._freeOnEvent(evt));
        this.addEventListener(XForm.ActionSubmit, (evt) => this._freeOnEvent(evt));
    }

    _freeOnEvent(evt) {
        if (isEventOutOfSlot(evt, this._overlaySlot)) {
            if (evt.target instanceof XForm) {
                this.free();
            }
        }
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

defineCustomElement(XOverlay);
