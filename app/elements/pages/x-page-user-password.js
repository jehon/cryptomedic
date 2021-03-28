
import { actions } from '../../config.js';
import { createElementWithObject, createElementWithTag, defineCustomElement } from '../../js/custom-element.js';
import { getRoute, routes, setRoute } from '../../js/router.js';
import XConfirmation from '../funcs/x-confirmation.js';
import XForm from '../funcs/x-form.js';
import XRequestor, { userGetBuilder, userPasswordBuilder } from '../funcs/x-requestor.js';
import XButton from '../render/x-button.js';
import XButtons from '../render/x-buttons.js';
import XGroupPanel from '../render/x-group-panel.js';
import XLabel from '../render/x-label.js';
import XPanel, { getPanelStyles } from '../render/x-panel.js';

/**
 * attributes:
 * - uid: the id of the user where to change the password
 */
export default class XPageUserPassword extends HTMLElement {
    /** @type {XRequestor} */
    _requestor

    /** @type {XForm} */
    _form

    /** @type {XLabel} */
    _label

    connectedCallback() {
        this.uid = parseInt(this.getAttribute('uid'));

        this.innerHTML = '';
        this.append(
            createElementWithTag('css-inherit'),
            getPanelStyles(this),
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
                                    createElementWithObject(XButton, { action: actions.alternate }, 'Disable password',
                                        el => el.addEventListener('click', () => this.emptyPassword())
                                    ),
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
        this._requestor.request(userGetBuilder(this.uid))
            .then(response => response.data)
            .then(data => {
                this.user = data;
                this._label.setAttribute('label', `New password for ${this.user.name}`);
            });
    }

    emptyPassword() {
        return this._requestor.request(userPasswordBuilder(this.uid, ''))
            .then(() => this.showConfirmation('empty'));
    }

    setPassword() {
        const values = this._form.getValues();
        return this._requestor.request(userPasswordBuilder(this.uid, values.password))
            .then(() => this.showConfirmation('updated'));
    }

    showConfirmation(action) {
        this.innerHTML = '';
        this.append(
            createElementWithTag('css-inherit'),
            createElementWithObject(XConfirmation, {},
                [
                    createElementWithTag('div', {},
                        `Password ${action} for user ${this.user.name}`
                    )
                ],
                el => el.addEventListener('validated', () => this.exit())
            )

        );
    }

    exit() {
        setRoute(getRoute(routes.users_list));
        this.dispatchEvent(new CustomEvent('exit'));
    }
}

defineCustomElement(XPageUserPassword);
