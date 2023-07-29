import {
  createElementWithObject,
  defineCustomElement
} from "../js/custom-element.js";
import { getRoute, routes } from "../js/router.js";
import XRequestor from "../widgets/func/x-requestor.js";
import XTable from "../widgets/x-table.js";
import XButton from "../widgets/style/x-button.js";
import XButtons from "../widgets/func/x-buttons.js";
import XPanel from "../widgets/style/x-panel.js";
import XReadBoolean from "../../v1/elements/x-read-boolean.js";
import pageStyles from "./page-helper.js";
import { usersCrud } from "../widgets/func/requests-admin.js";

/**
 * attributes:
 * - uid: the id of the user where to change the password
 */
export default class XPageUsersList extends HTMLElement {
  /** @type {XRequestor} */
  _requestor;

  /** @type {HTMLElement} */
  _listing;

  constructor() {
    super();
    this.innerHTML = "";

    this.append(
      pageStyles(this),
      (this._requestor = createElementWithObject(XRequestor, {}, [
        createElementWithObject(
          XPanel,
          { style: { justifyContent: "flex-end", flexDirection: "row" } },
          [
            createElementWithObject(
              XButton,
              { id: "add", actions: XButton.Default, toRoute: routes.user_add },
              "Add user"
            )
          ]
        ),
        (this._result = createElementWithObject(
          XTable,
          { full: true },
          [],
          (/** @type {XTable} */ el) =>
            el
              // .enrichTable({ class: 'table table-hover table-bordered tablesorter' })
              .addHeaders(1)
              .addDetail("id", { headers: ["Id"] })
              .addDetail("username", { headers: ["Username"] })
              .addDetail("name", { headers: ["Full Name"] })
              .addDetail("codage", { headers: ["Codage"] })
              .addDetail("email", { headers: ["Email"] })
              .addDetail(
                (data) =>
                  createElementWithObject(XReadBoolean, {
                    value: data.in_examiner_list
                  }),
                { headers: ["In Examiner List"] }
              )
              .addDetail(
                (data) =>
                  createElementWithObject(XReadBoolean, {
                    value: data.hasPassword
                  }),
                { headers: ["Has Password"] }
              )
              .addDetail("notes", { headers: ["Notes"] })
              .addDetail(
                (data) =>
                  createElementWithObject(XButtons, {}, [
                    createElementWithObject(
                      XButton,
                      {
                        id: "edit",
                        action: XButton.Default,
                        toRoute: getRoute(routes.user_edit, { uid: data.id })
                      },
                      "Edit"
                    ),
                    createElementWithObject(
                      XButton,
                      {
                        id: "pwd",
                        action: XButton.Default,
                        toRoute: getRoute(routes.user_password, {
                          uid: data.id
                        })
                      },
                      "Change Password"
                    )
                  ]),
                {
                  headers: ["Actions"]
                }
              )
        ))
      ]))
    );
  }

  connectedCallback() {
    this._requestor
      .request(usersCrud().list())
      .then((response) => response.data)
      .then((data) => this._result.setData(data));
  }
}

defineCustomElement(XPageUsersList);
