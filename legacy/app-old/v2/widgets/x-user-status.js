import {
  createElementWithObject,
  createElementWithTag
} from "../js/custom-element.js";
import { routeToLogin } from "../js/router.js";
import { getUsername, onSession, setSession } from "../js/session.js";
import { logoutBuilder } from "./func/requests-authenticator.js";
import XRequestor from "./func/x-requestor.js";
import "./style/x-button.js";
import XButton from "./style/x-button.js";
import { getPanelStyles } from "./style/x-panel.js";

const user = Symbol("user");
const logout = Symbol("logout");
const requestor = Symbol("requestor");

export default class XUserStatus extends HTMLElement {
  static get Tag() {
    return "x-user-status";
  }

  connectedCallback() {
    this.innerHTML = "";
    this.append(
      getPanelStyles(this.constructor.Tag, true),
      (this[logout] = createElementWithObject(
        XButton,
        { id: "logout", icon: "logout", discrete: true },
        [(this[user] = createElementWithTag("span", { id: "user" }))],
        (el) => el.addEventListener("click", () => this.doLogout())
      )),
      (this[requestor] = createElementWithObject(XRequestor, { global: true }))
    );

    this.unregisterListener = onSession(() => {
      const username = getUsername();
      if (username) {
        this[logout].removeAttribute("hidden");
        this[user].innerHTML = username;
        this.setAttribute("login", username);
      } else {
        this[logout].setAttribute("hidden", "hidden");
        this[user].innerHTML = "";
        this.removeAttribute("login");
      }
    });
  }

  disconnectedCallback() {
    /* istanbul ignore else */
    if (typeof this.unregisterListener == "function") {
      this.unregisterListener();
    }
    this.unregisterListener = null;
  }

  doLogout() {
    return this[requestor]
      .request(logoutBuilder())
      .then(() => setSession())
      .finally(() => routeToLogin());
  }
}

customElements.define(XUserStatus.Tag, XUserStatus);
