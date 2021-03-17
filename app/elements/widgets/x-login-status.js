
import '../render/x-button.js';
import { routeToLogin } from '../../js/router.js';
import { onSession, getUsername, setSession } from '../../js/session.js';
import XRequestor, { logoutBuilder } from '../funcs/x-requestor.js';
import { getPanelStyles } from '../render/x-panel.js';
import { createElementWithObject, createElementWithTag } from '../../js/custom-element.js';
import XButton from '../render/x-button.js';

const user = Symbol('user');
const logout = Symbol('logout');
const requestor = Symbol('requestor');

export default class XLoginStatus extends HTMLElement {
    connectedCallback() {
        this.innerHTML = '';
        this.append(
            getPanelStyles(this),
            this[requestor] = createElementWithObject(XRequestor, { global: true }, [
                this[logout] = createElementWithObject(XButton, { id: 'logout', icon: 'logout', discrete: true },
                    [
                        this[user] = createElementWithTag('span', { id: 'user' })
                    ],
                    el => el.addEventListener('click', () => this.doLogout()))
            ])
        );

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
            .then(() => setSession())
            .finally(() => routeToLogin());
    }
}

window.customElements.define('x-login-status', XLoginStatus);
