
import { messages } from '../../config.js';
import { setRoute, parseRouteLogin } from '../../js/router.js';
import { setSession } from '../../js/session.js';

import XRequestor, { loginRequestBuilder, loginCheckRequestBuilder } from '../funcs/x-requestor.js';
import { createElementWithObject, createElementWithTag, defineCustomElement } from '../../js/custom-element.js';
import XForm from '../funcs/x-form.js';
import XPanel from '../render/x-panel.js';
import XLabel from '../render/x-label.js';
import XButtons from '../render/x-buttons.js';
import XButton from '../render/x-button.js';

/**
 * attribute redirect - Where to redirect on login
 */
export default class XPageLogin extends HTMLElement {

    /** @type {XRequestor} */
    _requestor;

    /** @type {XForm} */
    _form;

    constructor() {
        super();
        this.classList.add('full');

        this.innerHTML = '';
        this.append(
            createElementWithObject(XPanel, {}, [
                this._requestor = createElementWithObject(XRequestor, { global: true }, [
                    this._form = createElementWithObject(XForm, {},
                        [
                            createElementWithTag('h2', {}, 'Please sign in'),
                            createElementWithObject(XLabel, { label: 'Username' }, [
                                createElementWithTag('input', { id: 'username', name: 'username', class: 'form-control', placeholder: 'Username', required: true, autofocus: true })
                            ]),
                            createElementWithObject(XLabel, { label: 'Password' }, [
                                createElementWithTag('input', { id: 'password', name: 'password', class: 'form-control', placeholder: 'Password', required: true, autofocus: true, type: 'password' })
                            ]),
                            createElementWithObject(XButtons, { slot: 'buttons' }, [
                                createElementWithObject(XButton, { id: 'submit' }, 'Login'),
                            ]),
                        ],
                        (el) => el.addEventListener('submit', () => this.doLogin())
                    )
                ])
            ])
        );
    }

    connectedCallback() {
        return this.doLoginCheck();
    }

    reset() {
        this._requestor.reset();
        this._form.clear();
        this.removeAttribute('requesting');
        this.removeAttribute('error');
    }

    async doLogin() {
        if (this._requestor.isRequesting()) {
            return -1;
        }
        this.reset();

        if (!this._form.validate()) {
            return 1;
        }

        const formData = this._form.data;

        this.setAttribute('requesting', 'doLogin');
        return this._requestor.request(loginRequestBuilder(formData.username.toLowerCase(), formData.password))
            .then((response) => {
                if (response.ok) {
                    this._form.addMessage({ text: 'Login success', level: messages.success, id: 'success' });
                    setSession(response.data);
                    setRoute(this.getAttribute('redirect'));
                    return true;
                }
                // We have a 404 (filtered)
                this._form.addMessage({ text: 'Invalid credentials', id: 'invalid-credentials' });
                this.setAttribute('error', 'invalid-credentials');
                return 2;
            })
            .finally(() => {
                this.removeAttribute('requesting');
            });
    }

    async doLoginCheck() {
        // 401: not authenticated
        this.setAttribute('requesting', 'doLoginCheck');
        return this._requestor.request(loginCheckRequestBuilder())
            .then(response => {
                if (response.ok) {
                    setSession(response.data);
                    setRoute(parseRouteLogin().redirect);
                }
            })
            .finally(() => {
                this.removeAttribute('requesting');
            });
    }
}

defineCustomElement(XPageLogin);
