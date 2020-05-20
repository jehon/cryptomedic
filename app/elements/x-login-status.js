
import JHElement from './jh-element.js';
import './panels/x-requestor.js';
import { routeToLogout, routeToLogin } from '../js/router.js';
import { setSession, onUsername } from '../js/session.js';
import { loginCheckRequestBuilder } from './panels/x-requestor.js';

const user = Symbol('user');
const logout = Symbol('logout');
const requestor = Symbol('requestor');

export default class XLoginStatus extends JHElement {
    render() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
				<span>
					<span id='user'></span>
					<img id='logout' style='height: 100%' src="/static/img/logout.gif" />
					<x-requestor global></x-requestor>
				</span>
			`;
        this.inheritCSS();
        this[user] = this.shadowRoot.querySelector('#user');
        this[logout] = this.shadowRoot.querySelector('#logout');
        this[requestor] = this.shadowRoot.querySelector('x-requestor');

        this[logout].addEventListener('click', () => this.doLogout());

        onUsername(username => {
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

        this.doLoginCheck();
    }

    doLogout() {
        routeToLogout('user');
    }

    // TODO: put this function in session.js
    doLoginCheck() {
        // 401: not authenticated
        this.setAttribute('requesting', 'doLoginCheck');
        return this[requestor].request(loginCheckRequestBuilder())
            .then(response => {
                if (response.ok) {
                    setSession(response.data);
                    // Where to route here ?? --> do this in login form
                }
                routeToLogin();
            })
            .finally(() => {
                this.removeAttribute('requesting');
            });
    }
}

window.customElements.define('x-login-status', XLoginStatus);
