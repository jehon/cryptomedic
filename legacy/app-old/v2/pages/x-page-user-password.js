import {
  createElementWithObject,
  createElementWithTag
} from "../js/custom-element.js";
import { overlayAcknowledge } from "../js/overlay-builder.js";
import { getRoute, routes, setRoute } from "../js/router.js";
import { usersCrud } from "../widgets/func/requests-admin.js";
import XButtons from "../widgets/func/x-buttons.js";
import XForm from "../widgets/func/x-form.js";
import XRequestor from "../widgets/func/x-requestor.js";
import XButton from "../widgets/style/x-button.js";
import XGroupPanel from "../widgets/style/x-group-panel.js";
import XLabel from "../widgets/style/x-label.js";
import XPanel, { getPanelStyles } from "../widgets/style/x-panel.js";
import pageStyles from "./page-helper.js";

/**
 * attributes:
 * - uid: the id of the user where to change the password
 */
export default class XPageUserPassword extends HTMLElement {
  static get Tag() {
    return "x-page-user-password";
  }

  /** @type {XRequestor} */
  _requestor;

  /** @type {XForm} */
  _form;

  /** @type {XLabel} */
  _label;

  connectedCallback() {
    this.uid = parseInt(this.getAttribute("uid"));

    this.innerHTML = "";
    this.append(
      pageStyles(this.constructor.Tag),
      createElementWithTag("css-inherit"),
      getPanelStyles(this.constructor.Tag),
      createElementWithObject(XPanel, {}, [
        createElementWithObject(XGroupPanel, { title: "Set the password" }, [
          (this._requestor = createElementWithObject(XRequestor, {}, [
            (this._form = createElementWithObject(
              XForm,
              {},
              [
                (this._label = createElementWithObject(
                  XLabel,
                  { label: "New password" },
                  [
                    createElementWithTag("input", {
                      class: "form-control",
                      name: "password",
                      required: true,
                      placeholder: "enter new password here",
                      autofocus: true
                    })
                  ]
                )),
                createElementWithObject(XButtons, { slot: "buttons" }, [
                  createElementWithObject(
                    XButton,
                    { action: XButton.Save },
                    "Set password"
                  ),
                  createElementWithObject(
                    XButton,
                    { action: XButton.Alternate },
                    "Disable password",
                    (el) =>
                      el.addEventListener("click", () => this.emptyPassword())
                  ),
                  createElementWithObject(XButton, { action: XButton.Cancel })
                ])
              ],
              (el) => {
                el.addEventListener(XForm.ActionSubmit, () =>
                  this.setPassword()
                );
                el.addEventListener(XForm.ActionReset, () => this.exit());
              }
            ))
          ]))
        ])
      ])
    );
    this._requestor
      .request(usersCrud().read(this.uid))
      .then((response) => response.data)
      .then((data) => {
        this.user = data;
        this._label.setAttribute("label", `New password for ${this.user.name}`);
      });
  }

  emptyPassword() {
    return this._requestor
      .request(usersCrud().updatePassword(this.uid, ""))
      .then(() => this.showConfirmation("empty"));
  }

  setPassword() {
    const values = this._form.getValues();
    return this._requestor
      .request(usersCrud().updatePassword(this.uid, values.password))
      .then(() => this.showConfirmation("updated"));
  }

  showConfirmation(action) {
    return overlayAcknowledge(
      `Password ${action} for user ${this.user.name}`
    ).then(() => this.exit());
  }

  exit() {
    setRoute(getRoute(routes.users_list));
    this.dispatchEvent(new CustomEvent("exit"));
  }
}

customElements.define(XPageUserPassword.Tag, XPageUserPassword);
