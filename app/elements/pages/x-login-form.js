
import { levels } from '../../config.js';
import { setRoute } from '../../js/router.js';
import { setSession } from '../../js/session.js';

import '../panels/x-requestor.js';
import '../panels/x-panel.js';
import '../panels/x-messages.js';
import { formInit, formGetContent, formValidate } from '../../js/form.js';
import { loginRequestBuilder } from '../panels/x-requestor.js';

const requestor = Symbol('requestor');
const form = Symbol('form');
const messages = Symbol('messages');

/**
 *
 * @attribute {url} redirect - Where to redirect on login
 */
export default class XLoginForm extends HTMLElement {
    constructor(...args) {
        super(...args);
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
                            <button id="login" class="btn btn-lg btn-primary btn-block">Log in</button>
                        </form>
                    </div>
                </x-panel>
			</x-requestor>`;

        this[requestor] = this.querySelector('x-requestor');
        this[form] = this.querySelector('form');
        this[messages] = this.querySelector('x-messages');

        formInit(this[form], () => this.doLogin());
        this.querySelector('button#login').addEventListener('click', (event) => { event.preventDefault(); this.doLogin(); return false; });

        this.classList.add('full');
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
            this[messages].addMessage({ text: 'Please fill in the form', level: levels.warning, id: 'empty' })
            return 1;
        }
        const formData = formGetContent(this[form]);

        this.setAttribute('requesting', 'doLogin');
        return this[requestor].request(loginRequestBuilder(formData.username.toLowerCase(), formData.password))
            .then((response) => {
                if (response.ok) {
                    this[messages].addMessage({ text: 'Login success', level: levels.success, id: 'success' });
                    setSession(response.data);
                    setRoute(this.getAttribute("redirect"));
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
}

window.customElements.define('x-login-form', XLoginForm);
