/* istanbul ignore file */

import JHElement from "./jh-element.js";
import "./x-waiting.js";
import "./x-o-overlay.js";

import axios from "../../../built/axios.js";
import { routeToLogin } from "../../v2/js/router.js";
import { setSession } from "../../v2/js/session.js";

const error = Symbol("error");
const waiting = Symbol("waiting");
const errorMsg = Symbol("errorMsg");
const errorContent = Symbol("errorContent");

export default class XRequestor extends JHElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
            <span>
                <x-o-overlay closable z-index=20 >
                    <h1 id='errorMsg'></h1>
                    <div id='errorContent'></div>
                    <div id='closeButton' class='btn btn-default'></div>
                </x-o-overlay>
                <x-o-waiting>
                    <slot></slot>
                </x-o-waiting>
            </span>`;
    this.inheritCSS();

    this[waiting] = this.shadowRoot.querySelector("x-o-waiting");
    this[error] = this.shadowRoot.querySelector("x-o-overlay");
    this[errorMsg] = this.shadowRoot.querySelector("#errorMsg");
    this[errorContent] = this.shadowRoot.querySelector("#errorContent");

    this[waiting].free();
    this[error].free();
    this.shadowRoot
      .querySelector("#closeButton")
      .addEventListener("click", () => {
        this[error].free();
      });
  }

  render() {
    super.render();
    this.style.width = "100%";
    this.style.display = "inline";
  }

  isRequesting() {
    return this[waiting].isBlocked();
  }

  isFailed() {
    return this[error].isBlocked();
  }

  request(opts) {
    this[waiting].block();
    this.setAttribute("running", "running");

    const options = {
      url: "/",
      ...opts,
      timeout: ("timeout" in opts ? opts.timeout : 30) * 1000
    };

    if (options.url[0] != "/") {
      options.url = `/api/${options.url}`;
    }

    if (!options.method || options.method == "GET") {
      options.params = options.data;
      delete options.data;
    }

    return axios(options).then(
      (response) => {
        // TODO: temp hack
        response.ok = response.status >= 200 && response.status < 300; // TODO: temp hack
        response.asJson = response.data; // TODO: temp hack

        this.removeAttribute("running");
        this[waiting].free();
        return response;
      },
      (errorResponse) => {
        this.removeAttribute("running");
        this[waiting].free();
        this[error].block();
        // Fill in the overlay
        this.showFailure(errorResponse);
        throw errorResponse;
      }
    );
  }

  // See https://github.com/axios/axios#handling-errors
  showFailure(errorResponse) {
    this[waiting].free();
    this[error].block();
    this[errorMsg].innerHTML = "Network error";
    if (typeof errorResponse == "object") {
      let html = "<table style='width: 300px'>";
      if (errorResponse.response) {
        // Code is not 2xx
        this[errorMsg].innerHTML = errorResponse.response.statusText;
        html += `<tr><td>Status code</td><td>${errorResponse.response.status}</td></tr>`;
        if (errorResponse.response.status == 401) {
          // Logout if 401
          setSession();
          routeToLogin("401");
          this[error].free();
        }
        // } else if (response instanceof FetchFull.TimeoutException) {
        // 	this[errorMsg].innerHTML = 'Time-out';
        // 	html += '<tr><td>Message</td><td>Is your network connection ok?</td></tr>';
      } else if (errorResponse.request) {
        this[errorMsg].innerHTML = "Network Error";
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
      html += "</table>";
      this[errorContent].innerHTML = html;
    } else {
      // String message
      this[errorMsg].innerHTML = errorResponse;
    }
  }

  requestAndFilter(options, allowed = []) {
    return this.request({
      // https://github.com/axios/axios#handling-errors
      validateStatus: function (status) {
        if (status >= 200 && status < 300) {
          return true;
        }
        if (allowed.indexOf(status) >= 0) {
          return true;
        }
        return false;
      },
      ...options
    }).catch((errorResponse) => {
      this.showFailure(errorResponse);
      throw errorResponse;
    });
  }
}

window.customElements.define("x-o-requestor", XRequestor);
