
import { actions } from '../../config.js';
import { createElementWithObject, createElementWithTag, defineCustomElement } from '../../js/custom-element.js';
import XMessages from '../render/x-messages.js';
import '../render/x-button.js';

/**
 * @typedef {import('../render/x-button.js').default} XButton
 */

// const log = (...args) => console.log('log: ', ...args);
const log = (..._args) => { };

/**
 * slot[]: where the objects are stored
 * slot[buttons]: additionnal commands
 *
 * The elements are taken in the "innerHTML" part of the component
 *
 * attributes:
 * - readonly: suppress the edit / delete / save buttons
 * - cancel-redirect: where to go on cancel
 * - submit-label: what is the label of the submit
 * - submit-post: where to submit the form (POST)
 * - submit-redictect: url
 *
 * functions:
 * - get/set data: the inline data
 * - validate: validate the form (extensible) -> send back a list of messages
 *     message: { text, level } | text
 */

export default class XForm extends HTMLElement {
    /** @type {XMessages} */
    _messages;

    constructor() {
        super();
        this._buttons = {};

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.append(
            // createElementWithObject('css-inherit'),
            createElementWithTag('slot'),
            this._messages =  /** @type {XMessages} */ (createElementWithObject(XMessages)),
            createElementWithTag('slot', { name: 'buttons' }),
        );

        this.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                // event.preventDefault();
                this.checkAndSubmit();
            }
        });
    }

    connectedCallback() {
        this._data = this.data;

        this.querySelectorAll(`x-button[action=${actions.cancel}]`)
            .forEach(el => (/** @type {XButton} */(el)).addEventListener('click',
                () => this.reset()
            ));

        this.querySelectorAll(`x-button:not([action]), x-button[action=${actions.query}], x-button[action=${actions.submit}]`)
            .forEach(el => (/** @type {XButton} */(el)).addEventListener('click',
                () => this.checkAndSubmit()
            ));
    }

    /**
     * @returns {Array<HTMLInputElement>} available
     */
    getDataElements() {
        return Array.from(this.querySelectorAll('[name]'));
    }

    /**
     * @param {object} data - the data to be stored in the form
     */
    set data(data) {
        this._data = data;
        this.reset();
    }

    get data() {
        let data = {};

        // form can be:
        //  - css selector
        //  - NodeList
        //  - HTMLElement

        let boundaries = [];

        // TODO: remove the boundaries concept ?
        boundaries = Array.from(this.querySelectorAll('x-form'));
        log('Boundaries: ', boundaries, this);

        nextElement:
        for (const j of this.getDataElements()) {

            // TODO: or the DataElement ???
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
                delete (data[name]);
                continue;
            }

            // Treat some special cases
            if (el.type) {
                switch (el.type) {
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
                delete (data[name]);
            } else {
                data[name] = value;
                log('ok: ', name, value);
            }
        }
        return data;
    }

    validate() {
        this._messages.clear();
        let result = true;

        this.getDataElements().forEach(el => {
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
        return true;
    }

    checkAndSubmit() {
        if (this.validate()) {
            this.dispatchEvent(new CustomEvent('submit'));
        }
    }

    addMessage(msg) {
        return this._messages.addMessage(msg);
    }

    clear() {
        if (this._messages) {
            this._messages.clear();
        }
    }

    reset() {
        this.clear();

        this.getDataElements().forEach(el => {
            const name = el.getAttribute('name');
            const val = (name in this._data ? this._data[name] : '');

            if (el.type == 'radio') {
                if (el.value == val) {
                    el.checked = true;
                } else {
                    el.checked = false;
                }
            } else {
                el.value = val;
            }
        });
    }
}

defineCustomElement(XForm);
