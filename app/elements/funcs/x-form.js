
import { actions } from '../../config.js';
import { createElementWithObject, createElementWithTag, defineCustomElement } from '../../js/custom-element.js';
import XMessages from '../render/x-messages.js';
import '../render/x-button.js';
import { getPanelStyles } from '../render/x-panel.js';

/**
 * @typedef {import('../render/x-button.js').default} XButton
 * @typedef {import('../render/x-message.js').Message} Message
 */

// const log = (...args) => console.log('log: ', ...args);
const log = (..._args) => { };

/**
 * Form facitlities
 *   - on enter, submit the form
 *   - can reset
 *   - can set values (based on names)
 *   - can get values (based on names)
 *
 * slot[]: where the objects are stored
 * slot[buttons]: additionnal commands
 *
 * The elements are taken in the "innerHTML" part of the component
 *
 * functions:
 * - getValues/setValues: the inline values
 * - validate: validate the form (extensible) -> send back a list of messages
 *     message: { text, level } | text
 *
 * events:
 *  - submit (when the form is valid)
 *  - reset (reset the form)
 */

// console.log(this.shadowRoot.querySelector('slot').assignedNodes({ flattern: true}));

export default class XForm extends HTMLElement {
    static get ActionSubmit() { return 'submit'; }
    static get ActionCancel() { return 'cancel'; }
    static get ActionDelete() { return 'delete'; }
    static get ActionReset() { return 'reset'; }

    /** @type {XMessages} */
    _messages;

    constructor() {
        super();
        this._buttons = {};

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.append(
            getPanelStyles(this),
            // createElementWithObject('css-inherit'),
            createElementWithTag('slot'),
            this._messages =  /** @type {XMessages} */ (createElementWithObject(XMessages)),
            createElementWithTag('slot', { name: 'buttons' }),
        );

        // On enter, submit the form
        this.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                // event.preventDefault();
                this.checkAndSubmit();
            }
        });
    }

    connectedCallback() {
        this._values = this.getValues();

        // For each "reset" button, auto reset
        this.querySelectorAll(`x-button[action="${actions.reset}"]`)
            .forEach(el => (/** @type {XButton} */(el)).addEventListener('click',
                () => this.reset()
            ));

        // For each "cancel" button, auto reset
        this.querySelectorAll(`x-button[action="${actions.cancel}"]`)
            .forEach(el => (/** @type {XButton} */(el)).addEventListener('click',
                () => this.dispatchEvent(new CustomEvent(XForm.ActionCancel))
            ));

        // For each "query" button, auto submit
        this.querySelectorAll(`x-button:not([action]), x-button[action="${actions.query}"], x-button[action="${actions.commit}"]`)
            .forEach(el => (/** @type {XButton} */(el)).addEventListener('click',
                () => this.checkAndSubmit()
            ));

        // For each "delete" button, ask confirmation and submit
        this.querySelectorAll(`x-button[action="${actions.delete}"]`)
            .forEach(el => (/** @type {XButton} */(el)).addEventListener('click',
                () => this.askAndDelete()
            ));

    }

    /**
     * Get the list of elements that can provide informations
     *
     * @returns {Array<HTMLInputElement>} available
     */
    _getValueElements() {
        return Array.from(this.querySelectorAll('[name]'));
    }

    /**
     * Set the values on the formular
     *
     * And keep them for later "reset"
     *
     * @param {object} values - the values to be stored in the form
     */
    setValues(values) {
        this._values = values;
        this.clearMessages();
        this._fillIn(values);
    }

    /**
     * Get the values currently on the formular
     *
     * @returns {object} values
     */
    getValues() {
        let values = {};

        // form can be:
        //  - css selector
        //  - NodeList
        //  - HTMLElement

        let boundaries = [];

        // TODO: remove the boundaries concept
        boundaries = Array.from(this.querySelectorAll('x-form'));
        log('Boundaries: ', boundaries, this);

        nextElement:
        for (const j of this._getValueElements()) {

            const el = /** @type {HTMLInputElement} */ (j);

            // Skip empty names
            let name = el.getAttribute('name');
            if (!name) {
                log('no name: ', el);
                continue;
            }

            // Skip disabled elements
            if (el.disabled) {
                log('disabled: ', name);
                continue;
            }

            // TODO: remove boundaries
            for (const f of boundaries) {
                if (f.contains(el)) {
                    log(`outside boundaries of ${f.id}:`, name);
                    continue nextElement;
                }
            }

            // Only take the selected radio
            if (el.matches('[type=radio]') && !el.matches(':checked')) {
                log('unchecked radio: ', name, el);
                continue;
            }

            /**
             * @type {*} the value of the element
             */
            let value = el.value;
            if (value === undefined) {
                continue;
            }

            // Skip empty values
            if (value === '' || value == null) {
                log('no value: ', name, value, typeof (value));
                delete (values[name]);
                continue;
            }

            // Treat some special cases
            if (el.type) {
                switch (el.type) {
                    case 'checkbox':
                        value = el.checked;
                        break;
                    case 'number':
                        value = Number.parseInt(value);
                        break;
                    /* istanbul ignore next: impossible to fill in a input[type=file] element - see MSDN */
                    case 'file':
                        // http://blog.teamtreehouse.com/uploading-files-ajax
                        // We can pass the 'File' object to FormData, it will handle it for us....
                        if (el.data) {
                            value = el.data.data;
                        } else {
                            value = null;
                        }
                        break;
                }
            }

            // Assign it
            if (value == null) {
                log('null value: ', name);
                delete (values[name]);
            } else {
                values[name] = value;
                log('ok: ', name, value);
            }
        }
        return values;
    }

    /**
     * Add a message
     *
     * @param {Message|string} msg to be added
     * @returns {string} the message id
     */
    addMessage(msg) {
        return this._messages.addMessage(msg);
    }

    /**
     * Remove all messages
     */
    clearMessages() {
        if (this._messages) {
            this._messages.clear();
        }
    }

    /**
     * Reset the values to the last saved state
     *
     * Automatically called by the "cancel" button
     *
     * Dispatch a "reset" event
     */
    reset() {
        this.clearMessages();
        this.setValues(this._values);
        this.dispatchEvent(new CustomEvent(XForm.ActionReset));
    }

    _fillIn(values) {
        this._getValueElements().forEach(el => {
            const name = el.getAttribute('name');
            const val = (name in values ? values[name] : '');

            if (el.type == 'radio') {
                if (el.value == val) {
                    el.checked = true;
                } else {
                    el.checked = false;
                }
            } else if (el.type == 'checkbox') {
                el.checked = !!val;
            } else {
                el.value = val;
            }
        });
    }

    /**
     * Check if the form is ok
     *
     * If it does validate:
     *   - dispatch a "submit" event
     *
     * If not:
     *   - set a "validation-error" attribute
     *   - add a message
     *
     * @returns {boolean} true if it does validate
     */
    checkAndSubmit() {
        this._messages.clear();
        let result = true;

        this._getValueElements().forEach(el => {
            if ('checkValidity' in el) {
                const res = el.checkValidity();
                if (!res) {
                    el.setAttribute('validation-error', el.validationMessage);
                } else {
                    el.removeAttribute('validation-error');
                }
                result = result && res;
            }
        });

        if (!result) {
            this.addMessage({ text: 'The form contains some errors.', id: 'form-invalid' });
            return false;
        }
        this.dispatchEvent(new CustomEvent(XForm.ActionSubmit));

        return true;
    }

    /**
     * Ask confirmation to the user and if so, emit a "delete" event
     */
    askAndDelete() {
        // TODO: render a better confirmation dialog (x-confirmation when ready)
        if (confirm('Are you sure you want to delete it?')) {
            this.dispatchEvent(new CustomEvent(XForm.ActionDelete));
        }
    }
}

defineCustomElement(XForm);
