
import '../panels/x-requestor.js';
import './x-button.js';
import { routeToLogin } from '../../js/router.js';
import { onSession, getUsername } from '../../js/session.js';
import { levels } from '../../config.js';
import { logoutBuilder } from '../panels/x-requestor.js';

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
                <x-button id='logout' icon='logout' level='${levels.discrete}'>
                    <span id='user'></span>
                </x-button>
                <x-requestor global></x-requestor>
        	`;
        this[user] = this.querySelector('#user');
        this[logout] = this.querySelector('#logout');

        /** @type module:widgets/x-requestor:XRequestor */
        this[requestor] = this.querySelector('x-requestor');

        this[logout].addEventListener('click', () => this.doLogout());

        this.unregisterListener = onSession(() => {
            console.error('username received in x-login-status: ', JSON.stringify(getUsername()));
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
        if (typeof (this.unregisterListener) == "function") {
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
