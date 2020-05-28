
import '../panels/x-requestor.js';
import './x-button.js';
import { routeToLogout } from '../../js/router.js';
import { onSession, getUsername } from '../../js/session.js';
import { levels } from '../../config.js';

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
        if (this.unregisterListener) {
            this.unregisterListener();
        }
        this.unregisterListener = false;
    }

    doLogout() {
        routeToLogout('user');
    }
}

window.customElements.define('x-login-status', XLoginStatus);
