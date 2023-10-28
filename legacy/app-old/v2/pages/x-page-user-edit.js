import {
  createElementWithObject,
  createElementWithTag
} from "../js/custom-element.js";
import getInputObject, { TYPES } from "../js/getInput.js";
import { overlayAcknowledge } from "../js/overlay-builder.js";
import { getRoute, routes, setRoute } from "../js/router.js";
import { usersCrud } from "../widgets/func/requests-admin.js";
import XButtons from "../widgets/func/x-buttons.js";
import XForm from "../widgets/func/x-form.js";
import XRequestor from "../widgets/func/x-requestor.js";
import XButton from "../widgets/style/x-button.js";
import XGroupPanel from "../widgets/style/x-group-panel.js";
import XLabel from "../widgets/style/x-label.js";
import XPanel from "../widgets/style/x-panel.js";
import pageStyles from "./page-helper.js";

/**
 * attributes:
 * - uid: the id of the user where to change the password
 */
export default class XPageUserEdit extends HTMLElement {
  static get Tag() {
    return "x-page-user-edit";
  }

  /** @type {number} */
  uid;

  /** @type {object} the user as an object */
  data;

  /** @type {XRequestor} */
  _requestor;

  /** @type {XForm} */
  _form;

  constructor() {
    super();
    this.innerHTML = "";
    this.append(
      pageStyles(this.constructor.Tag),
      createElementWithTag("css-inherit"),
      createElementWithTag(
        "style",
        {},
        `
    :host([uid="new"]) .no-create {
        display: none;
    }
            `
      ),
      createElementWithObject(XPanel, {}, [
        (this._requestor = createElementWithObject(XRequestor, {}, [
          createElementWithObject(XGroupPanel, { title: "Adding user" }, [
            (this._form = createElementWithObject(
              XForm,
              {},
              [
                createElementWithObject(
                  XLabel,
                  { label: "Id", class: "no-create" },
                  [getInputObject(TYPES.TEXT, "id", "", { disabled: true })]
                ),
                createElementWithObject(XLabel, { label: "Username" }, [
                  getInputObject(TYPES.TEXT, "username", "", { required: true })
                ]),
                createElementWithObject(XLabel, { label: "Name" }, [
                  getInputObject(TYPES.TEXT, "name", "", { required: true })
                ]),
                createElementWithObject(XLabel, { label: "Email" }, [
                  getInputObject(TYPES.TEXT, "email")
                ]),
                createElementWithObject(XLabel, { label: "Codage" }, [
                  getInputObject(TYPES.TEXT, "codage")
                ]),
                createElementWithObject(XLabel, { label: "In examiner list" }, [
                  getInputObject(TYPES.BOOLEAN, "in_examiner_list")
                ]),
                createElementWithObject(XLabel, { label: "Notes" }, [
                  getInputObject(TYPES.NOTES, "notes")
                ]),
                createElementWithObject(XButtons, { slot: "buttons" }, [
                  createElementWithObject(XButton, { action: XButton.Save }),
                  createElementWithObject(XButton, {
                    action: XButton.Delete,
                    class: "no-create"
                  }),
                  createElementWithObject(XButton, { action: XButton.Cancel })
                ])
              ],
              (el) => {
                el.addEventListener(XForm.ActionSubmit, () => this.save());
                el.addEventListener(XForm.ActionDelete, () => this.delete());
                el.addEventListener(XForm.ActionReset, () => this.exit());
              }
            ))
          ])
        ]))
      ])
    );
  }

  connectedCallback() {
    this.uid = parseInt(this.getAttribute("uid")) ?? 0;
    if (this.uid > 0) {
      this._requestor
        .request(usersCrud().read(this.uid))
        .then((response) => response.data)
        .then((data) => {
          this.data = data;
          this._form.setValues(data);
        });
    }
  }

  save() {
    const newValues = this._form.getValues();
    this._requestor
      .request(
        this.uid > 0
          ? usersCrud().update(this.uid, newValues)
          : usersCrud().create(newValues)
      )
      .then((response) => response.data)
      .then((data) => (this.data = data))
      .then(() =>
        overlayAcknowledge(
          `User ${this.data.name} ${this.uid > 0 ? "updated" : "created"}`
        )
      )
      .then(() => this.exit());
  }

  delete() {
    return this._requestor
      .request(usersCrud().delete(this.uid))
      .then(() => overlayAcknowledge(`User ${this.data.name} deleted`))
      .then(() => this.exit());
  }

  exit() {
    setRoute(getRoute(routes.users_list));
  }
}

customElements.define(XPageUserEdit.Tag, XPageUserEdit);
