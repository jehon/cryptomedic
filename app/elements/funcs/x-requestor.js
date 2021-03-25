
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
import { WithDataError } from '../../js/exceptions.js';

/**
 * @param {number} code - http code
 * @returns {string} the status text
 */
function getHttpMessage(code) {
    switch (code) {
        case 401: return 'Unauthorized';
        case 404: return 'Not found';
        default: return `Error #${code}`;
    }
}

export class ServerRequestError extends Error {
    constructor(response) {
        super(getHttpMessage(response.status));
        this.data = response.data;
        this.status = response.status;
        this.statusText = response.statusText; // ???
        this.headers = response.headers;
    }
}

export class TransportRequestError extends WithDataError {
    constructor(request) {
        super('Network Error', request);
    }
}

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
                    createElementWithObject(XPanel, { slot: 'overlay', full: true }, [
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
        this.setAttribute('running', 'running');
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
                response.ok = (response.status >= 200 && response.status < 300); // TODO: how to handle this ? throw again? see x-page-login
                this._waiting.free();
                return response;
            }, error => {
                this._waiting.free();
                let err = new Error();

                // https://github.com/axios/axios#handling-errors

                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    err = new ServerRequestError(error.response);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    err = new TransportRequestError(error.request);
                } else {
                    // Something happened in setting up the request that triggered an Error
                    err = error;
                }

                // Fill in the overlay
                this.showFailure(err);
                throw err;
            })
            .finally(() => this.removeAttribute('running'));
    }

    /**
     * Show an error response in a pop-up
     *
     * @param {TransportRequestError|ServerRequestError|Error} error from the request
     * @see See https://github.com/axios/axios#handling-errors
     */
    showFailure(error) {
        this.setAttribute('erroneous', 'erroneous');
        this._waiting.free();
        this._error.block();
        this._errorMsg.innerHTML = 'Network Error';
        let html = '<table style=\'width: 300px\'>';
        if (error instanceof ServerRequestError) {
            this._errorMsg.innerHTML = error.message;
            html += `<tr><td>Status code</td><td>${error.status}</td></tr>`;
            if (error.status == 401) {
                // this will trigger a redirect to some login form or anything else
                setSession();
                routeToLogin();
            }
        } else if (error instanceof TransportRequestError) {
            this._errorMsg.innerHTML = error.message;
            html += `<tr><td>Message</td><td>
                    Something went very wrong on your network. Please check:<br>
                    <ul>
                        <li>that you have an internet connection</li>
                        <li>that your connection is really working</li>
                    </ul>
                    In other case, please reload the page and try again..
                    <a href="javascript:window.location.reload()">Reload the page here</a></td></tr>`;
        } else {
            html += `<tr><td>Error</td><td>${error.message}</td></tr>`;
        }
        html += '</table>';
        this._errorContent.innerHTML = html;
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


/**
 * @param {number} entryyear to be checked
 * @param {number} entryorder to be checked
 *
 * @returns {object} options for request (see XRequestor#request)
 */
export function createReferenceBuilder(entryyear, entryorder) {
    return {
        method: 'POST',
        url: 'reference',
        data: {
            entryyear,
            entryorder
        }
    };
}

/**
 * @param {string} reportId name
 * @param {object} data describing the search
 *
 * @returns {object} options for request (see XRequestor#request)
 */
export function reportQueryBuilder(reportId, data) {
    return {
        url: 'reports/' + reportId,
        data
    };
}

/**
 * @param {object} data describing the search
 *
 * @returns {object} options for request (see XRequestor#request)
 */
export function patientSearchBuilder(data) {
    return {
        url: 'folder',
        data
    };
}

/**
 * @returns {object} options for request (see XRequestor#request)
 */
export function usersListBuilder() {
    return {
        url: 'users'
    };
}

/**
 * @param {number} uid of the user
 * @returns {object} options for request (see XRequestor#request)
 */
export function userGetBuilder(uid) {
    return {
        url: `users/${uid}`
    };
}

/**
 * @param {number} uid of the user
 * @param {string} password to be set
 * @returns {object} options for request (see XRequestor#request)
 */
export function userPasswordBuilder(uid, password) {
    return {
        url: `users/password/${uid}`,
        method: 'POST',
        data: { password }
    };
}

/**
 * @param {object} data to be set
 * @returns {object} options for request (see XRequestor#request)
 */
export function userCreateBuilder(data) {
    return {
        url: 'users',
        method: 'POST',
        data
    };
}

/**
 * @param {number} uid of the user
 * @param {object} data to be set
 * @returns {object} options for request (see XRequestor#request)
 */
export function userUpdateBuilder(uid, data) {
    return {
        url: `users/${uid}`,
        method: 'PUT',
        data
    };
}

/**
 * @param {number} uid of the user
 * @returns {object} options for request (see XRequestor#request)
 */
export function userDeleteBuilder(uid) {
    return {
        url: `users/${uid}`,
        method: 'DELETE'
    };
}
