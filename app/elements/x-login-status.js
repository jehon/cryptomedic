
import JHElement from './jh-element.js';
import store, { ACT_USER_LOGIN, ACT_USER_LOGOUT } from '../js/store.js';

const user = Symbol('user');
const logout = Symbol('logout');
const overlay = Symbol('overlay');
const requestor = Symbol('requestor');
const form = Symbol('form');

export default class XLoginStatus extends JHElement {
	constructor() {
		super();
		this.username = false;
	}

	render() {
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.innerHTML = `
				<span>
					<span id='user'></span>
					<img id='logout' style='height: 100%' src="/static/img/logout.gif" />
					<x-requestor></x-requestor>
					<x-overlay z-index=15 >
				    	<x-form class="form-signing" role="form">
							<div style='width: 300px'>
					        	<h2 class="form-signin-heading">Please sign in</h2>
					        	<label for="username">Username</label>
				         		<input id="username" name="username" class="form-control" placeholder="Username" required autofocus>
					        	<label for="password">Password</label>
					        	<input id="password" name="password" class="form-control" placeholder="Password" required type="password">
					      		<br />
						  		<button id="login" class="btn btn-lg btn-primary btn-block">Log in</button>
						  	</div>
				      	</x-form>
					</x-overlay>
				</span>
			`;
		this.inheritCSS();
		this[user] = this.shadowRoot.querySelector('#user');
		this[logout] = this.shadowRoot.querySelector('#logout');
		this[overlay] = this.shadowRoot.querySelector('x-overlay');
		this[requestor] = this.shadowRoot.querySelector('x-requestor');
		this[form] = this.shadowRoot.querySelector('x-form');

		this[logout].addEventListener('click', () => this.doLogout(false));

		store.subscribe(() => {
			const data = store.getState().user;
			if (data) {
				this.username = data.username;

			} else {
				this.username = false;
			}
			this.adapt();
		});

		this.shadowRoot.querySelector('button#login').addEventListener('click', () => this.doLogin());
		this[form].showMessages();

		this.doLoginCheck();
	}

	adapt() {
		if (this.username) {
			this[logout].removeAttribute('hidden');
			this[user].innerHTML = this.username;
			this[overlay].free();
			this.setAttribute('login', this.username);
		} else {
			this[logout].setAttribute('hidden', 'hidden');
			this[user].innerHTML = '';
			this[overlay].block();
			this.removeAttribute('login');
		}
	}

	doLoginCheck() {
		// 401: not authenticated
		this.setAttribute('requesting', 'doLoginCheck');
		return this[requestor].request({ url: 'auth/settings' })
			.then(response => {
				this.removeAttribute('requesting');
				if (response.ok) {
					this[overlay].free();
					store.dispatch({ type: ACT_USER_LOGIN, payload: response.asJson });
					return;
				}
				this.doLogout(true);
			})
			.catch(e => {
				this.removeAttribute('requesting');
				throw e;
			});
	}

	doLogin() {
		// 404: user not found (invalid credentials)

		this[form].showMessages();
		if (!this[form].validate()) {
			return;
		}
		const data = this[form].rebuildData();
		data.username = data.username.toLowerCase();

		this.setAttribute('requesting', 'doLogin');
		return this[requestor].requestAndFilter({ url: 'auth/mylogin', method: 'POST', data }, [404])
			.then((response) => {
				this.removeAttribute('requesting');
				if (response.ok) {
					this[overlay].free();
					store.dispatch({ type: ACT_USER_LOGIN, payload: response.asJson });
					return;
				}
				// We have a 404 (filtered)
				this.doLogout(true);
				this[form].showMessages(['Invalid credentials']);
			})
			.catch(e => {
				this.removeAttribute('requesting');
				throw e;
			});
	}

	doLogout(localOnly = false) {
		store.dispatch({ type: ACT_USER_LOGOUT });
		// localOnly could be the "tap" event, we thus check carefully what we receive
		if (localOnly !== true) {
			this[requestor].request({ url: 'auth/logout' });
		}
	}
}

window.customElements.define('x-login-status', XLoginStatus);
