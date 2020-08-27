
import { levels } from '../../config.js';
import { setRoute, parseRouteLogin } from '../../js/router.js';
import { setSession } from '../../js/session.js';

import '../widgets/x-requestor.js';
import '../widgets/x-panel.js';
import '../widgets/x-messages.js';
import '../widgets/x-button.js';
import { formInit, formGetContent, formValidate } from '../../js/form.js';
import { loginRequestBuilder, loginCheckRequestBuilder } from '../widgets/x-requestor.js';
import { defineCustomElement } from '../../js/custom-element.js';

const requestor = Symbol('requestor');
const form = Symbol('form');
const messages = Symbol('messages');

/**
 * attribute redirect - Where to redirect on login
 */
export default class XLoginForm extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
			<x-requestor style="width: 100%">
                <x-panel>
                    <div style='width: 300px'>
                        <form>
                            <h2 class="form-signin-heading">Please sign in</h2>
                            <label for="username">Username</label>
                            <input id="username" name="username" class="form-control" placeholder="Username" required autofocus>
                            <label for="password">Password</label>
                            <input id="password" name="password" class="form-control" placeholder="Password" required type="password">
                            <x-messages></x-messages>
                            <br />
                            <x-button id="login" action="commit" style='width: 100%'>Log in</x-button>
                        </form>
                    </div>
                </x-panel>
			</x-requestor>`;

        /** @type {import('../widgets/x-requestor.js').default} */
        this[requestor] = this.querySelector('x-requestor');
        this[form] = this.querySelector('form');
        /** @type {import('../widgets/x-messages.js').default} */
        this[messages] = this.querySelector('x-messages');

        formInit(this[form], () => this.doLogin());
        this.querySelector('x-button#login').addEventListener('click', (event) => { event.preventDefault(); this.doLogin(); return false; });

        this.classList.add('full');
    }

    connectedCallback() {
        return this.doLoginCheck();
    }

    reset() {
        this[requestor].reset();
        this[messages].clear();
    }

    async doLogin() {
        if (this[requestor].isRequesting()) {
            return -1;
        }
        this.reset();

        if (!formValidate(this[form])) {
            this[messages].addMessage({ text: 'Please fill in the form', level: levels.warning, id: 'empty' });
            return 1;
        }
        const formData = formGetContent(this[form]);

        this.setAttribute('requesting', 'doLogin');
        return this[requestor].request(loginRequestBuilder(formData.username.toLowerCase(), formData.password))
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
        return this[requestor].request(loginCheckRequestBuilder())
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

defineCustomElement(XLoginForm);

