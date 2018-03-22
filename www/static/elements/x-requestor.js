
const XRequestor = (function() {
	const error        = Symbol('error');
	const waiting      = Symbol('waiting');
	const errorMsg     = Symbol('errorMsg');
	const errorContent = Symbol('errorContent');

	class XRequestor extends JHElement {
		constructor() {
			super();
			this.attachShadow({ mode: 'open' });
			this.shadowRoot.innerHTML = `
            ${ JHElement.getCss() }
            <span>
                <x-overlay closable z-index=20 >
                    <h1 id='errorMsg'></h1>
                    <div id='errorContent'></div>
                    <div id='closeButton' class='btn btn-default'></div>
                </x-overlay>
                <x-waiting>
                    <slot></slot>
                </x-waiting>
            </span>`;

			this[waiting]      = this.shadowRoot.querySelector('x-waiting');
			this[error]        = this.shadowRoot.querySelector('x-overlay');
			this[errorMsg]     = this.shadowRoot.querySelector('#errorMsg');
			this[errorContent] = this.shadowRoot.querySelector('#errorContent');

			this[waiting].free();
			this[error].free();
			this.shadowRoot.querySelector('#closeButton').addEventListener('click', () => {
				this[error].free();
			});
		}

		render() {
			super.render();
			this.style.width = '100%';
			this.style.display = 'inline';
		}

		isRequesting() {
			return this[waiting].isBlocked();
		}

		isFailed() {
			return this[error].isBlocked();
		}

		request({ url = '/', data = {}, method = 'GET', timeout = 30 } = {}) {
			this[waiting].block();
			this.setAttribute('running', 'running');

			if (url[0] != '/') {
				url = '/api/' + API_VERSION + '/' + url;
			}

			const fetchfull = new FetchFull();
			fetchfull.requestWithCredentials('include');
			fetchfull.requestToUrl(url);
			fetchfull.requestWithData(data);
			fetchfull.responseAsJson();
			fetchfull.requestWithTimeOut(timeout);

			if (method == 'GET') {
				fetchfull.requestWithGet();
			} else {
				fetchfull.requestWithPutWithJSONBody();
				fetchfull.requestWithMethod(method);
			}

			return fetchfull.then(response => {
				this.removeAttribute('running');
				this[waiting].free();
				return response;
			})
				.catch(errorObj => {
					this.removeAttribute('running');
					this[waiting].free();
					this[error].block();
					// Fill in the overlay
					this.showFailure(errorObj);
					throw errorObj;
				});
		}

		showFailure(message) {
			this[waiting].free();
			this[error].block();
			this[errorMsg].innerHTML = 'Network error';
			if (typeof(message) == 'object') {
				let html = '<table style=\'width: 300px\'>';
				if (message instanceof Response) {
					this[errorMsg].innerHTML = message.statusText;
					html += `<tr><td>Status code</td><td>${message.status}</td></tr>`;
					if (message.status == 401) {
						// Logout if 401
						store.dispatch({ type: ACT_USER_LOGOUT });
						this[error].free();
					}
				} else if (message instanceof FetchFull.TimeoutException) {
					this[errorMsg].innerHTML = 'Time-out';
					html += '<tr><td>Message</td><td>Is your network connection ok?</td></tr>';
				} else if (message instanceof TypeError) {
					this[errorMsg].innerHTML = 'Network Error';
					html += `<tr><td>Message</td><td>
                    Something went very wrong on your network. Please check:<br>
                    <ul>
                        <li>that you have an internet connection</li>
                        <li>that your connection is really working</li>
                    </ul>
                    In other case, please reload the page and try again..
                    <a href="javascript:window.location.reload()">Reload the page here</a></td></tr>`;
				} else {
					// Complex message
					Object.keys(message).forEach(k => {
						// Part message in a table
						html += `<tr><td>${k}</td><td>${message[k]}</td></tr>`;
					});
				}
				html += '</table>';
				this[errorContent].innerHTML = html;
			} else {
				// String message
				this[errorMsg].innerHTML = message;
			}
		}

		requestAndFilter(options, allowed = []) {
			return this.request(options)
				.then(response => {
					if (response.ok || allowed.indexOf(response.status) >= 0) {
						return response;
					}
					this.showFailure(response);
					throw response;
				});
		}
	}

	window.customElements.define('x-requestor', XRequestor);

	return XRequestor;
})();
