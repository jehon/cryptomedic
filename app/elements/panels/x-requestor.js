/** @module widgets/x-requestor */

import axios from '../../cjs2esm/axios.js';
axios.defaults.timeout = 30 * 1000;

import { API_VERSION } from '../../config.js';
import { insertInSlot } from '../element-helpers.js';
import { setSession } from '../../js/session.js';
import { routeToLogin } from '../../js/router.js';

import XWaiting from './x-waiting.js';
import './x-overlay.js';
import './x-panel.js';
import '../widgets/x-button.js';
import '../../../node_modules/css-inherit/css-inherit.js';

const error = Symbol('error');
const errorMsg = Symbol('errorMsg');
const errorContent = Symbol('errorContent');

/**
 * Slot[]: content
 */
export default class XRequestor extends XWaiting {
    constructor() {
        super();

        insertInSlot(this, 'content', `
            <x-overlay id='error'>
                <x-panel slot='overlay'>
                    <css-inherit></css-inherit>
                    <h1 id='errorMsg'></h1>
                    <div id='errorContent'></div>
                    <x-button id='closeButton'>Dismiss</x-button>
                </x-panel>
                <div slot='content'><slot></slot></div>
            </x-overlay>
        `);

        /** @type module:widgets/x-overlay:XOverlay */
        this[error] = this.shadowRoot.querySelector('#error');
        this[errorMsg] = this.shadowRoot.querySelector('#errorMsg');
        this[errorContent] = this.shadowRoot.querySelector('#errorContent');
        this.shadowRoot.querySelector('#closeButton').addEventListener('click', () => this[error].free());
    }

    isFailed() {
        return this[error].isBlocked();
    }

    isRequesting() {
        return super.isBlocked();
    }

    isBlocked() {
        return super.isBlocked() || this.isFailed();
    }

    async _rawRequest(options) {
        return axios(options)
    }

    reset() {
        this.removeAttribute('running');
        this.removeAttribute('erroneous');
        this.free();
        this[error].free();
        this[errorMsg].innerHTML = '';
        this[errorContent].innerHTML = '';
    }

    async request(opts) {
        this.reset();
        this.block();

        const options = {
            url: '/',
            ...opts,
            timeout: ((('timeout' in opts) ? opts.timeout : 30) * 1000)
        };

        if (options.url[0] != '/') {
            options.url = `/api/${API_VERSION}/${options.url}`;
        }

        if (!options.method || options.method == 'GET') {
            options.params = options.data;
            delete options.data;
        }

        return this._rawRequest(options)
            .then(response => {
                // TODO: temp hack
                response.ok = (response.status >= 200 && response.status < 300); // TODO: temp hack

                this.free();
                return response;
            }, errorResponse => {
                this.free();
                // Fill in the overlay
                this.showFailure(errorResponse);
                throw errorResponse;
            });
    }

    // See https://github.com/axios/axios#handling-errors
    showFailure(errorResponse) {
        this.setAttribute('erroneous', 'erroneous');
        this.free();
        this[error].block();
        this[errorMsg].innerHTML = 'Network error';
        if (typeof (errorResponse) == 'object') {
            let html = '<table style=\'width: 300px\'>';
            if (errorResponse.response) {
                // Code is not 2xx
                this[errorMsg].innerHTML = errorResponse.response.statusText;
                html += `<tr><td>Status code</td><td>${errorResponse.response.status}</td></tr>`;
                if (errorResponse.response.status == 401) {
                    // this will trigger a redirect to some login form or anything else
                    setSession();
                    routeToLogin();
                }
            } else if (errorResponse.request) {
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
                html += `<tr><td>Error</td><td>${errorResponse.message}</td></tr>`;
            }
            html += '</table>';
            this[errorContent].innerHTML = html;
        } else {
            // String message
            this[errorMsg].innerHTML = errorResponse;
        }
    }
}

window.customElements.define('x-requestor', XRequestor);

export function requestAndFilterBuilder(options, allowed = []) {
    return {
        ...options,
        // https://github.com/axios/axios#handling-errors
        validateStatus: function (status) {
            if (status >= 200 && status < 300) {
                return true;
            }
            if (allowed.indexOf(status) >= 0) {
                return true;
            }
            return false;
        }
    }
}

export function loginRequestBuilder(username, password) {
    return requestAndFilterBuilder({
        url: 'auth/mylogin', method: 'POST',
        data: { username, password }
    }, [404])
}

export function loginCheckRequestBuilder() {
    return requestAndFilterBuilder({
        url: 'auth/settings'
    }, [401]);
}

export function logoutBuilder() {
    return {
        url: `/api/${API_VERSION}/auth/logout`
    };
}
