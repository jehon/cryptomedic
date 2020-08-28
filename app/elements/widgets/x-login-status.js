
import './generic/x-button.js';
import { routeToLogin } from '../../js/router.js';
import { onSession, getUsername } from '../../js/session.js';
import { logoutBuilder } from './x-requestor.js';

const user = Symbol('user');
const logout = Symbol('logout');
const requestor = Symbol('requestor');

export default class XLoginStatus extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
                <style>
                    x-login-status {
                        display: block;
                    }
                </style>
                <x-button id='logout' icon='logout' discrete>
                    <span id='user'></span>
                </x-button>
                <x-requestor global></x-requestor>
        	`;
        this[user] = this.querySelector('#user');
        this[logout] = this.querySelector('#logout');

        /**
         * @type {import('./x-requestor.js').default} XRequestor
         */
        this[requestor] = this.querySelector('x-requestor');

        this[logout].addEventListener('click', () => this.doLogout());

        this.unregisterListener = onSession(() => {
            const username = getUsername();
            if (username) {
                this[logout].removeAttribute('hidden');
                this[user].innerHTML = username;
                this.setAttribute('login', username);
            } else {
                this[logout].setAttribute('hidden', 'hidden');
                this[user].innerHTML = '';
                this.removeAttribute('login');
            }
        });
    }

    disconnectedCallback() {
        /* istanbul ignore else */
        if (typeof (this.unregisterListener) == 'function') {
            this.unregisterListener();
        }
        this.unregisterListener = null;
    }

    async doLogout() {
        return this[requestor].request(logoutBuilder())
            .finally(() => routeToLogin());
    }
}

window.customElements.define('x-login-status', XLoginStatus);
