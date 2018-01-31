(function() {
	const username  = Symbol("username");
	const logout    = Symbol("logout");
	const overlay   = Symbol("overlay");
	const requestor = Symbol("requestor");
	const form      = Symbol("form");

	class XLoginStatus extends JHElement {
		constructor() {
			super();
			this.username = false;

			this.attachShadow({ mode: 'open' });
			this.shadowRoot.innerHTML = `
				<span>
					<span id='username'></span>
					<img id='logout' src="/static/img/logout.gif" />
					<x-requestor></x-requestor>
					<x-overlay closable z-index=15 >
				    	<x-form class="form-signing" role="form">
				        	<h2 class="form-signin-heading">Please sign in</h2>
				        	<label for="username">Username</label>
			         		<input name="username" class="form-control" placeholder="Username" required autofocus>
				        	<label for="password">Password</label>
				        	<input name="password" class="form-control" placeholder="Password" required type="password">
				      		<br />
					  		<button id="login" class="btn btn-lg btn-primary btn-block">Log in</button>
				      	</x-form>
					</x-overlay>
				</span>
			`;
			this[username]  = this.shadowRoot.querySelector("#username");
			this[logout]    = this.shadowRoot.querySelector("#logout");
			this[overlay]   = this.shadowRoot.querySelector("x-overlay");
			this[requestor] = this.shadowRoot.querySelector("x-requestor");
			this[form]      = this.shadowRoot.querySelector("x-form");

			this[logout].addEventListener("click", () => this.doLogout());

			store.subscribe(() => {
				const data = store.getState().user;
				if (data) {
					this.username = data.username;
					if (!window.cryptomedic) {
						window.cryptomedic = {};
					}
					window.cryptomedic.serverSettings = data;

					/* global JHAuthorized */
					JHAuthorized.setAuthorizedList(data.authorized);

					if (location.hash == "#/login") {
						location.hash = "#/home";
					}
				} else {
					this.username = false;
					window.cryptomedic.serverSettings = {};
					location.hash = "/login";
				}
				this.adapt();
			});

			this.shadowRoot.querySelector("button#login").addEventListener("click", () => this.doLogin());

			this.doLoginCheck();
		}

		adapt() {
			if (this.username) {
				this[logout].removeAttribute("hidden");
				this[username].innerHTML = this.username;
				this[overlay].free();
			} else {
				this[logout].setAttribute("hidden", "hidden");
				this[username].innerHTML = "";
				this[overlay].block();
			}
		}

		doLoginCheck() {
			this[requestor].request({ url: "auth/settings" })
				.then(response => this._treatLoginResponse(response));
		}

		doLogin() {
			this[form].showMessages();
			if (!this[form].validate()) {
				return;
			}
			const data = this[form].rebuildData();
			data.username = data.username.toLowerCase();

			this[requestor].request({ url: "auth/mylogin", method: "POST", data })
				.then(response => this._treatLoginResponse(response));
		}

		_treatLoginResponse(response) {
			console.log(response.status, response.asJson);
			if (response.status == 200) {
				this[overlay].free();
				store.dispatch({ type: ACT_USER_LOGIN, payload: response.asJson });
			} else {
				store.dispatch({ type: ACT_USER_LOGOUT });
			}
		}

		doLogout(localOnly = false) {
			let finished = Promise.resolve();

			store.dispatch({ type: ACT_USER_LOGOUT });
			// localOnly could be the "tap" event, we thus check carefully what we receive
			if (localOnly !== true) {
				finished = finished.then(() => {
					this[requestor].request({ url: "auth/logout" })
				});
			}
			finished.then(() => store.dispatch({ type: ACT_USER_LOGOUT }))
		}

	}

	window.customElements.define('x-login-status', XLoginStatus);

})();
