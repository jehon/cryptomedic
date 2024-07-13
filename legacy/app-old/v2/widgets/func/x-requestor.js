import axios from "../../../../built/axios.js";
axios.defaults.timeout = 30 * 1000;

import { routeToLogin } from "../../js/router.js";
import { setSession } from "../../js/session.js";

import "../../../../../node_modules/css-inherit/jehon-css-inherit.js";
import nullify from "../../../../../src/utils/nullify.js";
import {
  createElementsFromHTML,
  createElementWithObject,
  createElementWithTag
} from "../../js/custom-element.js";
import {
  overlayAcknowledge,
  overlayWaiting
} from "../../js/overlay-builder.js";
import XLabel from "../style/x-label.js";

import { TransportRequestError } from "../../../../../src/utils/exceptions.js";
export { TransportRequestError } from "../../../../../src/utils/exceptions.js";

/**
 * @param {number} code - http code
 * @returns {string} the status text
 */
function getHttpMessage(code) {
  switch (code) {
    case 401:
      return "Unauthorized";
    case 404:
      return "Not found";
    default:
      return `Error #${code}`;
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

// TODO: should be a function and not a component anymore

/**
 * Slot[]: content (TODO: remove)
 * Attribute:
 *   > global
 *   < running, erroneous
 */
export default class XRequestor extends HTMLElement {
  static get Tag() {
    return "x-requestor";
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.append(
      createElementWithTag(
        "style",
        {},
        `
      :host(${this.constructor.Tag}) {
          display: flex;
          flex-direction: column;
      `
      ),
      document.createElement("slot")
    );
  }

  /** @type {function(void): void} */
  _stopWaiting = () => {};

  /**
   * @returns {boolean} wheter the request is failed
   */
  isFailed() {
    return this.hasAttribute("erroneous");
  }

  /**
   * @returns {boolean} wheter the request is running
   */
  isRequesting() {
    return this.hasAttribute("running");
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
    this.removeAttribute("running");
    this.removeAttribute("erroneous");
    if (this._stopWaiting) {
      this._stopWaiting();
      this._stopWaiting = () => {};
    }
  }

  _rawRequest(options) {
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
   * @returns {Promise} that resolve whith the request
   */
  request(opts) {
    this.reset();
    this.setAttribute("running", "running");
    this._stopWaiting = overlayWaiting("Requesting");

    const options = {
      url: "/",
      ...opts,
      data: opts.data ? nullify(opts.data) : undefined,
      timeout: ("timeout" in opts ? opts.timeout : 30) * 1000
    };

    if (options.url[0] != "/") {
      options.url = `/api/${options.url}`;
    }

    if (!options.method || options.method == "GET") {
      options.params = options.data;
      delete options.data;
    }

    return this._rawRequest(options)
      .then(
        (response) => {
          response.ok = response.status >= 200 && response.status < 300; // TODO: how to handle this ? throw again? see x-page-login
          this._stopWaiting();
          this._stopWaiting = () => {};
          return response;
        },
        (error) => {
          this._stopWaiting();
          this._stopWaiting = () => {};
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
        }
      )
      .finally(() => this.removeAttribute("running"));
  }

  /**
   * Show an error response in a pop-up
   *
   * @param {TransportRequestError|ServerRequestError|Error} error from the request
   * @see See https://github.com/axios/axios#handling-errors
   * @returns {Promise} to wait for acknowledge
   */
  showFailure(error) {
    this.setAttribute("erroneous", "erroneous");
    this._stopWaiting();
    this._stopWaiting = () => {};

    /** @type {Array<string|HTMLElement>} */
    const errorMsg = [createElementWithTag("h1", {}, error.message)];

    if (error instanceof ServerRequestError) {
      errorMsg.push(
        createElementWithObject(
          XLabel,
          { label: "Status code" },
          "" + error.status
        )
      );
      if (error.status == 401) {
        // this will trigger a redirect to some login form or anything else
        setSession();
        routeToLogin();
      }
    } else if (error instanceof TransportRequestError) {
      errorMsg.push(
        createElementWithObject(
          XLabel,
          { label: "Message" },
          createElementsFromHTML(`
            Something went very wrong on your network. Please check:<br>
                    <ul>
                        <li>that you have an internet connection</li>
                        <li>that your connection is really working</li>
                    </ul>
                    In other case, please reload the page and try again..
                    <a href="javascript:window.location.reload()">Reload the page here</a></td></tr>`)
        )
      );
    } else {
      errorMsg.push("Network error");
    }
    return overlayAcknowledge(errorMsg).then(() =>
      this.removeAttribute("erroneous")
    );
  }
}

customElements.define(XRequestor.Tag, XRequestor);

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

export class RequestCRUD {
  /** @type {string} */
  basePath;

  constructor(basePath) {
    this.basePath = basePath;
  }

  /**
   * @param {object} [parameters] to restrict the search
   * @returns {object} options for request (see XRequestor#request)
   */
  list(parameters) {
    return {
      url: this.basePath,
      data: parameters
    };
  }

  /**
   * To create an element
   *
   * @param {object} data to create the element
   * @returns {object} options for request (see XRequestor#request)
   */
  create(data) {
    return {
      url: this.basePath,
      method: "POST",
      data
    };
  }

  /**
   * To read an entity
   *
   * @param {number} id to be requested
   * @returns {object} options for request (see XRequestor#request)
   */
  read(id) {
    return {
      url: this.basePath + "/" + id
    };
  }

  /**
   * To update an element
   *
   * @param {number} id to be requested
   * @param {object} data to create the element
   * @returns {object} options for request (see XRequestor#request)
   */
  update(id, data) {
    return {
      url: this.basePath + "/" + id,
      method: "PUT",
      data
    };
  }

  /**
   * To delete an element
   *    data may be null, but should be used for optimistic locking
   *
   * @param {number} id to be requested
   * @param {object} [data] to create the element
   * @returns {object} options for request (see XRequestor#request)
   */
  delete(id, data) {
    return {
      url: this.basePath + "/" + id,
      method: "DELETE",
      data
    };
  }

  /**
   * Unlock a file
   *
   * @param {number} id to be unlocked
   * @returns {object} options for request (see XRequestor#request)
   */
  unlock(id) {
    return {
      url: this.basePath + "/unlock/" + id
    };
  }
}
