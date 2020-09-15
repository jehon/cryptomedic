
import axios from '../../../cjs2esm/axios.js';
axios.defaults.timeout = 30 * 1000;

import { API_VERSION } from '../../../config.js';
import { insertInSlot } from '../../element-helpers.js';
import { setSession } from '../../../js/session.js';
import { routeToLogin } from '../../../js/router.js';

import XWaiting from './x-waiting.js';
import './x-overlay.js';
import './x-panel.js';
import './x-button.js';
import '../../../../node_modules/css-inherit/css-inherit.js';
import { defineCustomElement } from '../../../js/custom-element.js';
import { getBrowserDescription } from '../../../js/browser.js';

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
                    <x-button action='cancel' id='closeButton'>Dismiss</x-button>
                </x-panel>
                <div slot='content'><slot></slot></div>
            </x-overlay>
        `);

        /** @type {import('./x-overlay.js').default} */
        this[error] = this.shadowRoot.querySelector('#error');
        this[errorMsg] = this.shadowRoot.querySelector('#errorMsg');
        this[errorContent] = this.shadowRoot.querySelector('#errorContent');
        this.shadowRoot.querySelector('#closeButton').addEventListener('click', () => this[error].free());
    }

    /**
     * @returns {boolean} wheter the request is failed
     */
    isFailed() {
        return this[error].isBlocked();
    }

    /**
     * @returns {boolean} wheter the request is running
     */
    isRequesting() {
        return super.isBlocked();
    }

    /**
     * @returns {boolean} wheter the request is running or has failed (isFailed || isRequesting)
     */
    isBlocked() {
        return super.isBlocked() || this.isFailed();
    }

    async _rawRequest(options) {
        return axios(options);
    }

    /**
     * Return to standard state
     */
    reset() {
        this.removeAttribute('running');
        this.removeAttribute('erroneous');
        this.free();
        this[error].free();
        this[errorMsg].innerHTML = '';
        this[errorContent].innerHTML = '';
    }

    /**
     * Make a request
     *
     * @param {object} opts of the request
     * @property {string} url of the resquest
     * @property {string} [method] of the request (GET by default)
     * @property {number} [timeout] of the request (in seconds)
     * @property {object} [data] of the request (GET param will be taken from here)
     *
     * @returns {Promise} that resolve whith the request
     */
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

    /**
     * Show an error response in a pop-up
     *
     * @param {object} errorResponse from axios
     * @see See https://github.com/axios/axios#handling-errors
     */
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

defineCustomElement(XRequestor);

/**
 * Build the request options for request where 'allowed' return code is not an error
 *
 * @param {object} options of the request
 * @param {Array<number>} allowed http return codes
 * @returns {object} options for request (see XRequestor#request)
 */
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
    };
}

/**
 * Build object for XRequestor#request
 *
 * @param {string} username of the request
 * @param {string} password of the request
 * @returns {object} options for request (see XRequestor#request)
 */
export function loginRequestBuilder(username, password) {
    return requestAndFilterBuilder({
        url: 'auth/mylogin', method: 'POST',
        data: { username, password, browser: getBrowserDescription() }
    }, [404]);
}

/**
 * Build object for XRequestor#request
 *
 * @returns {object} options for request (see XRequestor#request)
 */
export function loginCheckRequestBuilder() {
    return requestAndFilterBuilder({
        url: 'auth/settings', method: 'POST',
        data: { browser: getBrowserDescription() }
    }, [401]);
}

/**
 * Build object for XRequestor#request
 *
 * @returns {object} options for request (see XRequestor#request)
 */
export function logoutBuilder() {
    return {
        url: `/api/${API_VERSION}/auth/logout`
    };
}
