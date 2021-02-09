
import XOverlay from './x-overlay.js';
import { defineCustomElement, createElementWithTag, createElementWithObject } from '../../js/custom-element.js';
import XPanel from './x-panel.js';
import { spacing } from '../../config.js';

/**
 * slot[*]: the content to be protected
 */
export default class XWaiting extends HTMLElement {

    /** @type {XOverlay} */
    _overlay;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.shadowRoot.append(
            createElementWithTag('style', {}, `
    :host {
        display: block;
    }

    img {
        vertical-align: baseline;
    }

    #versal {
        padding-left: ${spacing.text}
    }
            `),
            this._overlay = /** @type {XOverlay} */ (createElementWithObject(XOverlay, {}, [
                createElementWithObject(XPanel, { full: true, slot: 'overlay' }, [
                    createElementWithTag('div', {}, [
                        createElementWithTag('img', { src: '/static/img/waiting.gif' }),
                        createElementWithTag('span', { id: 'versal' }, 'Loading '),
                        createElementWithTag('slot', { name: 'waiting' })
                    ])
                ]),
                createElementWithTag('slot')
            ]))
        );

        if (this.hasAttribute('blocked')) {
            this.block();
        }
    }

    block() {
        this.setAttribute('blocked', 'blocked');
        this._overlay.block();
    }

    free() {
        this._overlay.free();
        this.removeAttribute('blocked');
    }

    isBlocked() {
        return this._overlay.isBlocked();
    }

    aroundPromise(p) {
        this.block();
        return p.then((data) => {
            this.free();
            return data;
        })
            .catch((error) => {
                this.free();
                throw error;
            });
    }
}

defineCustomElement(XWaiting);
