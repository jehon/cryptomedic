
import { levels } from '../../config.js';
import { setRoute, parseRouteLogin } from '../../js/router.js';
import { setSession } from '../../js/session.js';

import XRequestor, { loginRequestBuilder, loginCheckRequestBuilder } from '../widgets/generic/x-requestor.js';
import XPanel from '../widgets/generic/x-panel.js';
import XMessages from '../render/x-messages.js';
import XButton from '../render/x-button.js';
import { formInit, formGetContent, formValidate } from '../../js/form.js';
import { createElementWith, defineCustomElement } from '../../js/custom-element.js';

const form = Symbol('form');
const messages = Symbol('messages');

/**
 * attribute redirect - Where to redirect on login
 */
export default class XLoginForm extends XRequestor {
    constructor() {
        super();
        this.classList.add('full');
        // The component is a final one, so we use the "slot" system here
        this.append(
            createElementWith(XPanel, {}, [
                createElementWith('div', { style: 'width: 300px' }, [
                    this[form] = createElementWith('form', {}, [
                        createElementWith('h2', { class: 'form-signin-heading' }, 'Please sign in'),
                        createElementWith('label', { for: 'username' }, 'Username'),
                        createElementWith('input', { id: 'username', name: 'username', class: 'form-control', placeholder: 'Username', required: true, autofocus: true }),
                        createElementWith('label', { for: 'password' }, 'Password'),
                        createElementWith('input', { id: 'password', name: 'password', class: 'form-control', placeholder: 'Password', required: true, autofocus: true, type: 'password' }),
                        this[messages] = /** @type {XMessages} */ (createElementWith(XMessages)),
                        createElementWith('br'),
                        createElementWith(XButton, { id: 'login', action: 'commit', style: 'width: 100%' }, 'Log in',
                            (el) => el.addEventListener('click', (event) => { event.preventDefault(); this.doLogin(); return false; }))
                    ], (el) => formInit(el, () => this.doLogin()))
                ])
            ])
        );
    }

    connectedCallback() {
        return this.doLoginCheck();
    }

    reset() {
        super.reset();
        this[messages].clear();
    }

    async doLogin() {
        if (this.isRequesting()) {
            return -1;
        }
        this.reset();

        if (!formValidate(this[form])) {
            this[messages].addMessage({ text: 'Please fill in the form', level: levels.warning, id: 'empty' });
            return 1;
        }
        const formData = formGetContent(this[form]);

        this.setAttribute('requesting', 'doLogin');
        return this.request(loginRequestBuilder(formData.username.toLowerCase(), formData.password))
            .then((response) => {
                if (response.ok) {
                    this[messages].addMessage({ text: 'Login success', level: levels.success, id: 'success' });
                    setSession(response.data);
                    setRoute(this.getAttribute('redirect'));
                    return true;
                }
                // We have a 404 (filtered)
                this[messages].addMessage({ text: 'Invalid credentials', id: 'cred' });
                return 2;
            })
            .finally(() => {
                this.removeAttribute('requesting');
            });
    }

    async doLoginCheck() {
        // 401: not authenticated
        this.setAttribute('requesting', 'doLoginCheck');
        return this.request(loginCheckRequestBuilder())
            .then(response => {
                if (response.ok) {
                    setSession(response.data);
                    setRoute(parseRouteLogin().redirect);
                }
            }, () => {
                this.block();
            })
            .finally(() => {
                this.removeAttribute('requesting');
            });
    }
}

defineCustomElement(XLoginForm);
