
import { actions } from '../../config.js';
import { createElementWithObject, createElementWithTag, defineCustomElement } from '../../js/custom-element.js';
import { setRoute, getRoute, routes } from '../../js/router.js';
import getInputObject, { TYPES } from '../funcs/getInput.js';
import XConfirmation from '../funcs/x-confirmation.js';
import XForm from '../funcs/x-form.js';
import XRequestor, { userCreateBuilder, userDeleteBuilder, userGetBuilder, userUpdateBuilder } from '../funcs/x-requestor.js';
import XButton from '../render/x-button.js';
import XButtons from '../render/x-buttons.js';
import XGroupPanel from '../render/x-group-panel.js';
import XLabel from '../render/x-label.js';
import XPanel from '../render/x-panel.js';

/**
 * attributes:
 * - uid: the id of the user where to change the password
 */
export default class XPageUserEdit extends HTMLElement {
    /** @type {number} */
    uid

    /** @type {object} the user as an object */
    data

    /** @type {XRequestor} */
    _requestor

    /** @type {XForm} */
    _form

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.shadowRoot.append(
            createElementWithTag('css-inherit'),
            createElementWithTag('style', {}, `
    :host([uid="new"]) .no-create {
        display: none;
    }
            `),
            createElementWithObject(XPanel, {}, [
                this._requestor = createElementWithObject(XRequestor, {}, [
                    createElementWithObject(XGroupPanel, { title: 'Adding user' }, [
                        this._form = createElementWithObject(XForm, {},
                            [
                                createElementWithObject(XLabel, { label: 'Id', class: 'no-create' }, [
                                    getInputObject(TYPES.TEXT, 'id', '', { disabled: true })
                                ]),
                                createElementWithObject(XLabel, { label: 'Username' }, [
                                    getInputObject(TYPES.TEXT, 'username', '', { required: true })
                                ]),
                                createElementWithObject(XLabel, { label: 'Name' }, [
                                    getInputObject(TYPES.TEXT, 'name', '', { required: true })
                                ]),
                                createElementWithObject(XLabel, { label: 'Email' }, [
                                    getInputObject(TYPES.TEXT, 'email')
                                ]),
                                createElementWithObject(XLabel, { label: 'Codage' }, [
                                    getInputObject(TYPES.TEXT, 'codage')
                                ]),
                                createElementWithObject(XLabel, { label: 'In examiner list' }, [
                                    getInputObject(TYPES.BOOLEAN, 'inExaminerList')
                                ]),
                                createElementWithObject(XLabel, { label: 'Notes' }, [
                                    getInputObject(TYPES.NOTES, 'notes')
                                ]),
                                createElementWithObject(XButtons, { slot: 'buttons' }, [
                                    createElementWithObject(XButton, { action: actions.commit }, 'Save'),
                                    createElementWithObject(XButton, { action: actions.delete, class: 'no-create' }),
                                    createElementWithObject(XButton, { action: actions.cancel })
                                ])
                            ],
                            el => {
                                el.addEventListener('submit', () => this.save());
                                el.addEventListener('delete', () => this.delete());
                                el.addEventListener('reset', () => this.exit());
                            }
                        )
                    ])
                ])
            ])
        );
    }

    connectedCallback() {
        this.uid = parseInt(this.getAttribute('uid')) ?? 0;
        if (this.uid > 0) {
            this._requestor.request(userGetBuilder(this.uid))
                .then(response => response.data)
                .then((data) => {
                    this.data = data;
                    this._form.setValues(data);
                });
        }
    }

    save() {
        const newValues = this._form.getValues();
        this._requestor.request(
            this.uid > 0
                ? userUpdateBuilder(this.uid, newValues)
                : userCreateBuilder(newValues)
        )
            .then(response => response.data)
            .then(data => {
                this.data = data;
                this.shadowRoot.innerHTML = '';
                this.shadowRoot.append(
                    createElementWithTag('css-inherit'),
                    createElementWithObject(XConfirmation, {},
                        [
                            createElementWithTag('div', {},
                                `User ${this.data.name} ${this.uid > 0 ? 'updated' : 'created'}`
                            )
                        ],
                        el => el.addEventListener('validated', () => this.exit())
                    )

                );
            });

    }

    delete() {
        return this._requestor.request(userDeleteBuilder(this.uid))
            .then(() => {
                this.shadowRoot.innerHTML = '';
                this.shadowRoot.append(
                    createElementWithTag('css-inherit'),
                    createElementWithObject(XConfirmation, {},
                        [
                            createElementWithTag('div', {},
                                `User ${this.data.name} deleted`
                            )
                        ],
                        el => el.addEventListener('validated', () => this.exit())
                    )

                );
            });
    }

    exit() {
        setRoute(getRoute(routes.user_list));
    }
}

defineCustomElement(XPageUserEdit);
