(function() {
	const username    = Symbol("username");
	const logout      = Symbol("logout");
	const overlay     = Symbol("overlay");

	class XLoginStatus extends JHElement {
		constructor() {
			super();
			this.username = false;

			this.attachShadow({ mode: 'open' });
			this.shadowRoot.innerHTML = `
				<span id='username'></span>
				<img id='logout' src="/static/img/logout.gif" />
				<x-overlay>
					<div id='loginForm'>
					  	<div class='col-sm-offset-4 col-sm-4'>
					    	<form class="form-signing" role="form">
					        	<h2 class="form-signin-heading">Please sign in</h2>
					        	<label for="username">Username</label>
				         		<input id="login_username" class="form-control" placeholder="Username" required autofocus>
					        	<label for="password">Password</label>
					        	<input id="login_password" class="form-control" placeholder="Password" required type="password">
					      		<br />
					      		<div>
					          		<div id='login_error' class="alert alert-danger">
					              		<a href="#" class="close" data-dismiss="alert">&times;</a>
					              		Invalid username/password. Please try again.
					        		</div>
					      		</div>
					      		<br>
						  		<button id="go" class="btn btn-lg btn-primary btn-block">Log in</button>
					      </form>
					      <br>
					  </div>
					</div>
				</x-overlay>
			`;
			this[username]    = this.shadowRoot.querySelector("#username");
			this[logout]      = this.shadowRoot.querySelector("#logout");
			this[overlay]     = this.shadowRoot.querySelector("x-overlay");

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

			this.doLoginCheck();
		}

		adapt() {
				if (this.username) {
					this[logout].removeAttribute("hidden");
					this[username].innerHTML = this.username;
				} else {
					this[logout].setAttribute("hidden", "hidden");
					this[username].innerHTML = "";
				}
		}

		// showLogin() {
		// 	this[overlay].block();
		// }

		// doLogin() {
		// }

		doLogout() {
			store.dispatch({ type: ACT_USER_LOGOUT });
			// TODO: request Logout
		}

		doLoginCheck() {
			// TODO: request Check login
			store.dispatch({ type: ACT_USER_LOGOUT });
		}

		_treatResponse(data) {

		}
	}

	window.customElements.define('x-login-status', XLoginStatus);

})();
