
import { createElementWith, defineCustomElement } from '../../../js/custom-element.js';
import { setRoute } from '../../../js/router.js';
import { buildTemplate } from '../../../js/string-utils.js';
import XRequestor from './x-requestor.js';
import XMessages from '../../render/x-messages.js';
import XButtons from '../../render/x-buttons.js';
import XButton from '../../render/x-button.js';

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

export default class XForm extends XRequestor {
    get observedAttributes() {
        return [
            'submit-label',
            'no-cancel'
            // 'readonly'
        ];
    }

    getXRequestorContents() {
        // The formular:
        //   - the main content is the set of inputs/...
        //   - in the inner side, the buttons and the layout
        //

        this.buttons = {};

        const rootElement = [
            createElementWith('style', {}, `
:host([no-cancel]) x-button#cancel {
    display: nonev
}
`),
            createElementWith('slot', { id: 'content' }),
            this.messages =  /** @type {XMessages} */ (createElementWith(XMessages)),
            createElementWith(XButtons, {}, [
                this.buttons.submit = createElementWith(XButton, { id: 'submit' },
                    this.getAttribute('submit-label') || 'Submit',
                    (el) => el.addEventListener('click', () => this.onClickSubmit())),

                this.buttons.cancel = createElementWith(XButton, { id: 'cancel' },
                    'Cancel',
                    (el) => el.addEventListener('click', () => this._onClickCancel())),

                // this.buttons.edit = createElementWith(XButton, { id: 'edit' },
                //     'Edit',
                //     (el) => el.addEventListener('click', () => this.onEdit())),

                // createElementWith(XButton, { id: 'delete' },
                //     'Delete',
                //     (el) => el.addEventListener('click', () => this.onDelete())),
            ])
        ];

        this._data = this.data;

        return rootElement;
    }

    attributeChangedCallback(attributeName, _oldValue, newValue) {
        switch (attributeName) {
            // case 'no-cancel':
            //     this.buttons.cancel.style.display = this.hasAttribute('no-cancel') ? 'none' : 'block';
            //     break;
            case 'submit-label':
                // TODO
                if (this.buttons?.submit) {
                    this.buttons.submit.innerHTML = newValue || 'Submit';
                }
                break;
            // case 'readonly':
            //     this.adapt();
            //     break;
        }
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
            /** @type {HTMLInputElement} */
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
            // this.buttons.submit.click();
            return false;
        }
        return true;
    }

    reset() {
        this.messages.clear();

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

    /**
     * @private
     * @returns {Promise<boolean|object>} if the validation is ok
     */
    async onClickSubmit() {
        this.messages.clear();

        if (!this.validate()) {
            // TODO: more explicit
            this.messages.addMessage('The form contains some errors.');
            return false;
        }

        return this.onSubmit(this.data);
    }

    /**
     * @param {object} data to be sent (formular data by default)
     * @returns {Promise<object>} resolving with the data from the request
     */
    async onSubmit(data = this.data) {
        if (this.hasAttribute('submit-post')) {
            const submitUrl = buildTemplate(this.getAttribute('submit-post'))(data);

            return this.request({
                url: submitUrl,
                method: 'POST',
                data
            })
                .then(response => this.onSubmitSuccess(response));
        }

        return data;
    }

    /**
     * To handle the return from the onSubmit, in the url submit case
     *
     * @param {object} response from the request
     */
    onSubmitSuccess(response) {
        log(response);
        const submitRedirect = buildTemplate(this.getAttribute('submit-redirect'))(response);
        log(submitRedirect);
        if (submitRedirect) {
            setRoute(submitRedirect);
        }
    }

    /**
     * @private
     */
    _onClickCancel() {
        this.reset();
        this.onCancel();
    }

    /**
     * To be called when the user has choosen to "cancel",
     * after handling default behaviors
     */
    onCancel() {
        if (this.hasAttribute('cancel-redirect')) {
            setRoute(this.getAttribute('cancel-redirect'));
        }
    }

    // onEdit() {

    // }

    // adapt() {
    //     // Adapt to read / write mode
    // }
}

defineCustomElement(XForm);
