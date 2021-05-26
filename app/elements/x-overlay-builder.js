
import { actions } from '../config.js';
import { createElementWithObject, createElementWithTag } from '../js/custom-element.js';
import XForm from './funcs/x-form.js';
import XButton from './render/x-button.js';
import XButtons from './render/x-buttons.js';
import XOverlay from './render/x-overlay.js';
import XPanel from './render/x-panel.js';

// TODO: x-overlay should not have a 'inline' content, only a 'popup' content
/**
 * @typedef {import('./funcs/x-form.js').FormValidator} FormValidator
 */

class OverlayBuilder {
    /** @type {XOverlay} */
    xOverlay

    /** @type {XForm}  */
    xForm

    /** @type {HTMLDivElement}  */
    xHeader

    /** @type {Promise} */
    promise

    /** @type {function(*): void} */
    resolve

    /** @type {function(*): void} */
    reject

    constructor() {
        this.promise = new Promise((resolve, reject) => { this.resolve = resolve; this.reject = reject; });

        this.xOverlay = createElementWithObject(XOverlay, { global: true },
            [
                createElementWithObject(XPanel, { slot: 'overlay' }, [
                    createElementWithTag('div', {
                        // The box
                        style: {
                            padding: '40px',
                            backgroundColor: 'white',
                            color: 'black',
                            border: 'solid gray 1px',
                            boxShadow: '10px 5px 5px black'
                        }
                    }, [
                        this.xHeader = /** @type {HTMLDivElement} */ (createElementWithTag('div', {
                            style: {
                                paddingBottom: '20px'
                            }
                        })),
                        this.xForm = createElementWithObject(XForm, {}, [
                            this.xFormContent = createElementWithTag('div'),
                            this.xFormButtons = createElementWithObject(XButtons, { slot: 'buttons' }),
                        ])
                    ])
                ])
            ],
            el => el.addEventListener(XOverlay.ActionFree, (evt) => this._terminate(/** @type {CustomEvent} */(evt)))
        );
        this.xOverlay.block();
    }

    /**
     * @param {Array<HTMLElement|string>} divs to be added
     * @returns {OverlayBuilder} for chaining
     */
    withTexts(divs) {
        this.xHeader.append(...(
            divs.map(d => typeof (d) == 'string'
                ? createElementWithTag('div', {}, d)
                : d
            )
        ));
        return this;
    }

    /**
     * @param {Array<HTMLElement>} data to be putted in the form
     * @param {FormValidator} [validator] to validate the input
     * @returns {OverlayBuilder} for chaining
     */
    withForm(data, validator = null) {
        this.xForm.append(...data);
        if (validator) {
            this.xForm.withCustomValidator(validator);
        }
        return this;
    }

    /**
     * @param {Array<XButton|string>} buttons to be putted in the form
     * @returns {OverlayBuilder} for chaining
     */
    withButtons(buttons) {
        this.xFormButtons.append(...(
            buttons.map(b => typeof (b) == 'string'
                ? createElementWithObject(XButton, { action: b })
                : b)
        ));
        return this;
    }

    /**
     *
     * @param {CustomEvent} event passed by the XOverlay
     */
    _terminate(event) {
        // Remove from the DOM
        this.xOverlay.remove();
        if (event.detail.type == XForm.ActionSubmit) {
            this.resolve({
                type: event.detail.type,
                detail: event.detail.detail
            });
        } else {
            this.reject(event);
        }
    }

    go() {
        // Insert this into the DOM
        document.querySelector('body').insertAdjacentElement('afterbegin', this.xOverlay);
        return this.promise;
    }
}

/**
 * @returns {OverlayBuilder} to build up an overlay
 */
export function createOverlay() {
    return new OverlayBuilder();
}

/**
 * @param {string} text to be inserted as info
 * @returns {OverlayBuilder} to build up an overlay
 */
export function createOverlayInfo(text) {
    return createOverlay()
        .withTexts([text])
        .withButtons([
            createElementWithObject(XButton, { action: actions.ok })
        ]);
}
