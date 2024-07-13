import { messages } from "../../../../src/config.js";
import { parseRouteLogin, setRoute } from "../js/router.js";
import { setSession } from "../js/session.js";

import {
  createElementWithObject,
  createElementWithTag
} from "../js/custom-element.js";
import {
  loginCheckRequestBuilder,
  loginRequestBuilder
} from "../widgets/func/requests-authenticator.js";
import XButtons from "../widgets/func/x-buttons.js";
import XForm from "../widgets/func/x-form.js";
import XRequestor from "../widgets/func/x-requestor.js";
import XIoString from "../widgets/io/x-io-string.js";
import XButton from "../widgets/style/x-button.js";
import XGroupPanel from "../widgets/style/x-group-panel.js";
import XLabel from "../widgets/style/x-label.js";
import XPanel from "../widgets/style/x-panel.js";
import pageStyles from "./page-helper.js";

/**
 * attribute redirect - Where to redirect on login
 */
export default class XPageLogin extends HTMLElement {
  static get Tag() {
    return "x-page-login";
  }

  /** @type {XRequestor} */
  _requestor;

  /** @type {XForm} */
  _form;

  constructor() {
    super();
    this.classList.add("full");

    this.innerHTML = "";
    this.append(
      pageStyles(this.constructor.Tag),
      createElementWithObject(XPanel, {}, [
        createElementWithObject(
          XGroupPanel,
          { title: "Connexion...", style: { maxWidth: "400px" } },
          [
            (this._requestor = createElementWithObject(
              XRequestor,
              { global: true },
              [
                (this._form = createElementWithObject(
                  XForm,
                  {},
                  [
                    createElementWithTag("h2", {}, "Please sign in"),
                    createElementWithObject(XLabel, { label: "Username" }, [
                      createElementWithObject(XIoString, {
                        input: true,
                        name: "username",
                        placeholder: "Username",
                        required: true,
                        autofocus: true
                      })
                    ]),
                    createElementWithObject(XLabel, { label: "Password" }, [
                      createElementWithObject(XIoString, {
                        input: true,
                        name: "password",
                        placeholder: "Password",
                        required: true,
                        autofocus: true,
                        type: "password"
                      })
                    ]),
                    createElementWithObject(XButtons, { slot: "buttons" }, [
                      createElementWithObject(
                        XButton,
                        { id: "submit" },
                        "Login"
                      )
                    ])
                  ],
                  (el) =>
                    el.addEventListener(XForm.ActionSubmit, () =>
                      this.doLogin()
                    )
                ))
              ]
            ))
          ]
        )
      ])
    );
  }

  connectedCallback() {
    return this.doLoginCheck();
  }

  reset() {
    this._requestor.reset();
    this._form.clearMessages();
    this.removeAttribute("requesting");
    this.removeAttribute("error");
  }

  doLogin() {
    if (this._requestor.isRequesting()) {
      return -1;
    }
    this.reset();

    const formData = this._form.getValues();

    this.setAttribute("requesting", "doLogin");
    return this._requestor
      .request(
        loginRequestBuilder(formData.username.toLowerCase(), formData.password)
      )
      .then((response) => {
        if (response.ok) {
          this._form.addMessage({
            text: "Login success",
            level: messages.success,
            id: "success"
          });
          setSession(response.data);
          setRoute(this.getAttribute("redirect"));
          return true;
        }
        // We have a 404 (filtered)
        this._form.addMessage({
          text: "Invalid credentials",
          id: "invalid-credentials"
        });
        this.setAttribute("error", "invalid-credentials");
        return 2;
      })
      .finally(() => {
        this.removeAttribute("requesting");
      });
  }

  doLoginCheck() {
    // 401: not authenticated
    this.setAttribute("requesting", "doLoginCheck");
    return this._requestor
      .request(loginCheckRequestBuilder())
      .then((response) => {
        if (response.ok) {
          setSession(response.data);
          setRoute(parseRouteLogin().redirect);
        }
      })
      .finally(() => {
        this.removeAttribute("requesting");
      });
  }
}

customElements.define(XPageLogin.Tag, XPageLogin);
