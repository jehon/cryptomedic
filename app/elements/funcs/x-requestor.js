
import axios from '../../cjs2esm/axios.js';
axios.defaults.timeout = 30 * 1000;

import { API_VERSION } from '../../config.js';
import { setSession } from '../../js/session.js';
import { routeToLogin } from '../../js/router.js';

import XWaiting from '../render/x-waiting.js';
import XOverlay from '../render/x-overlay.js';
import XButton from '../render/x-button.js';
import { createElementWithObject, createElementWithTag, defineCustomElement } from '../../js/custom-element.js';
import { getBrowserDescription } from '../../js/browser.js';
import '../../../node_modules/css-inherit/css-inherit.js';
import XPanel from '../render/x-panel.js';

/**
 * Slot[]: content
 */
export default class XRequestor extends HTMLElement {

    /** @type {XWaiting} */
    _waiting;

    /** @type {XOverlay} */
    _error;

    static get observedAttributes() {
        return ['global'];
    }

    attributeChangedCallback(attributeName, _oldValue, _newValue) {
        switch (attributeName) {
            case 'global':
                if (this.hasAttribute('global')) {
                    this._waiting.setAttribute('global', 'global');
                } else {
                    this._waiting.removeAttribute('global');
                }
                break;
        }
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.append(
            createElementWithTag('style', {}, `
    :host {
        display: block;
    }

    x-waiting {
        height: 100%;
    }

    x-overlay {
        height: 100%;
    }
            `),
            createElementWithTag('css-inherit'),
            this._waiting = /** @type {XWaiting} */ (createElementWithObject(XWaiting, {}, [
                this._error = /** @type {XOverlay} */(createElementWithObject(XOverlay, { type: 'on-error' }, [
                    createElementWithObject(XPanel, { slot: 'overlay' }, [
                        // createElementWithTag('css-inherit'),
                        this._errorMsg = createElementWithTag('h1', { id: 'errorMsg' }),
                        this._errorContent = createElementWithTag('div', { id: 'errorContent' }),
                        createElementWithObject(XButton, { action: 'cancel', id: 'closeButton' }, 'Dismiss',
                            (el) => el.addEventListener('click', () => this._error.free())
                        )
                    ]),
                    createElementWithTag('slot')
                ]))
            ]))
        );

        if (this.hasAttribute('start-blocked')) {
            this._waiting.block();
        }
    }

    /**
     * @returns {boolean} wheter the request is failed
     */
    isFailed() {
        return this._error.isBlocked();
    }

    /**
     * @returns {boolean} wheter the request is running
     */
    isRequesting() {
        return this._waiting.isBlocked();
    }

    /**
     * @returns {boolean} wheter the request is running or has failed (isFailed || isRequesting)
     */
    isBlocked() {
        return this.isRequesting() || this.isFailed();
    }

    /**
     * Return to standard state
     */
    reset() {
        this.removeAttribute('running');
        this.removeAttribute('erroneous');
        this._waiting.free();
        this._error.free();
        this._errorMsg.innerHTML = '';
        this._errorContent.innerHTML = '';
    }

    async _rawRequest(options) {
        return axios(options);
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
        this._waiting.block();

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

                this._waiting.free();
                return response;
            }, errorResponse => {
                this._waiting.free();
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
        this._waiting.free();
        this._error.block();
        this._errorMsg.innerHTML = 'Network error';
        if (typeof (errorResponse) == 'object') {
            let html = '<table style=\'width: 300px\'>';
            if (errorResponse.response) {
                // Code is not 2xx
                this._errorMsg.innerHTML = errorResponse.response.statusText;
                html += `<tr><td>Status code</td><td>${errorResponse.response.status}</td></tr>`;
                if (errorResponse.response.status == 401) {
                    // this will trigger a redirect to some login form or anything else
                    setSession();
                    routeToLogin();
                }
            } else if (errorResponse.request) {
                this._errorMsg.innerHTML = 'Network Error';
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
            // console.log(html);
            this._errorContent.innerHTML = html;
        } else {
            // String message
            this._errorMsg.innerHTML = errorResponse;
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

/**
 * @param {number} entryyear to be checked
 * @param {number} entryorder to be checked
 *
 * @returns {object} options for request (see XRequestor#request)
 */
export function checkReferenceBuilder(entryyear, entryorder) {
    return {
        url: 'reference/' + entryyear + '/' + entryorder
    };
}

// createReference(year, order) {
//     setCurrentFolder();

//     return this.requestAndFilter({
//         url: 'reference', method: 'POST', data: {
//             entryyear: year,
//             entryorder: order
//         }
//     })
//         .then(response => {
//             let f = new Folder(response.asJson.folder);
//             patientFolderCache.set(response.asJson.id, f);
//             setCurrentFolder(f);
//             return response.asJson;
//         });
// }

