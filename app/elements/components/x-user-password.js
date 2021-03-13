
import { actions } from '../../config.js';
import { createElementWithObject, createElementWithTag, defineCustomElement } from '../../js/custom-element.js';
import XConfirmation from '../funcs/x-confirmation.js';
import XForm from '../funcs/x-form.js';
import XRequestor, { setPasswordBuilder } from '../funcs/x-requestor.js';
import XButton from '../render/x-button.js';
import XButtons from '../render/x-buttons.js';
import XGroupPanel from '../render/x-group-panel.js';
import XLabel from '../render/x-label.js';
import XPanel from '../render/x-panel.js';

/**
 * attributes:
 * - id: the id of the user where to change the password
 */
export default class XUserPassword extends HTMLElement {
    static get observedAttributes() {
        return ['name'];
    }

    /** @type {XRequestor} */
    _requestor

    /** @type {XForm} */
    _form

    /** @type {XLabel} */
    _label

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.shadowRoot.append(
            createElementWithTag('css-inherit'),
            createElementWithObject(XPanel, {}, [
                createElementWithObject(XGroupPanel, { title: 'Set the password' }, [
                    this._requestor = createElementWithObject(XRequestor, {}, [
                        this._form = createElementWithObject(XForm, {},
                            [
                                this._label = createElementWithObject(XLabel, { label: 'New password' }, [
                                    createElementWithTag('input', {
                                        class: 'form-control',
                                        name: 'password',
                                        required: true,
                                        placeholder: 'enter new password here',
                                        autofocus: true
                                    })
                                ]),
                                createElementWithObject(XButtons, { slot: 'buttons' }, [
                                    createElementWithObject(XButton, { action: actions.commit }, 'Set password'),
                                    createElementWithObject(XButton, { action: actions.cancel })
                                ])
                            ],
                            el => {
                                el.addEventListener('submit', () => this.setPassword());
                                el.addEventListener('reset', () => this.exit());
                            }
                        )
                    ])
                ])
            ])
        );
    }

    attributeChangedCallback(attributeName, _oldValue, newValue) {
        switch (attributeName) {
            case 'name':
                this._label.setAttribute('label', `New password for ${newValue}`);
                break;
        }
    }

    setPassword() {
        // TODO
        const values = this._form.getValues();
        this._requestor.request(setPasswordBuilder(this.getAttribute('id'), values.password))
            .then(() => this.showConfirmation());
    }

    showConfirmation() {
        this.shadowRoot.innerHTML = '';
        this.shadowRoot.append(
            createElementWithTag('css-inherit'),
            createElementWithObject(XConfirmation, {},
                [
                    createElementWithTag('div', {},
                        `Password updated for user ${this.getAttribute('name')}`
                    )
                ],
                el => el.addEventListener('validated', () => this.exit())
            )

        );
    }

    exit() {
        this.dispatchEvent(new CustomEvent('exit'));
    }
}

defineCustomElement(XUserPassword);
