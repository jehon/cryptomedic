import { messages } from "../../../../src/config.js";
import XInputDate from "../../v1/elements/x-input-date.js";
import {
  createElementWithObject,
  createElementWithTag
} from "../js/custom-element.js";
import { createOverlay, overlayAcknowledge } from "../js/overlay-builder.js";
import { pricesCrud } from "../widgets/func/requests-admin.js";
import XButtons from "../widgets/func/x-buttons.js";
import XForm from "../widgets/func/x-form.js";
import XMessages from "../widgets/func/x-messages.js";
import XRequestor from "../widgets/func/x-requestor.js";
import XButton from "../widgets/style/x-button.js";
import XGroupPanel from "../widgets/style/x-group-panel.js";
import XLabel from "../widgets/style/x-label.js";
import XMessage from "../widgets/style/x-message.js";
import "../widgets/x-price-item-edit.js";
import XPriceItemEdit from "../widgets/x-price-item-edit.js";
import pageStyles from "./page-helper.js";

/**
 * Sort !in place!
 *
 * @param {Array<object>} prices to be sorted
 * @returns {Array<object>} sorted
 */
function sortPrices(prices) {
  prices.sort((a, b) => {
    // Left(smal) == bigger date_from
    if (a == null || a.date_from == null || a.date_from == "") {
      return 1;
    }
    if (b == null || b.date_from == null || b.date_from == "") {
      return -1;
    }

    if (a.date_from == b.date_from) {
      return 0;
    }

    if (a.date_from > b.date_from) {
      return -1;
    }

    return 1;
  });

  return prices;
}

/**
 *
 *
 * Editing ?
 *     ==> soit on édit le dernier
 *       si: activation n'est pas aujourd'hui
 *       si: pas d'utilisation avérée
 *     alors: proposition d'éditer le dernier prix
 *     sinon: ajout d'un nouveau
 */
export default class XPagePrices extends HTMLElement {
  static get Tag() {
    return "x-page-prices";
  }

  /** @type {HTMLElement} */
  explainEl;

  /** @type {XRequestor} */
  _requestor;

  /** @type {number} */
  editId = null;

  constructor() {
    super();

    this.innerHTML = "";
    this.append(
      pageStyles(this.constructor.Tag),
      (this._header = createElementWithTag("div", {}, [
        createElementWithObject(XMessages, {}, [
          createElementWithObject(XMessage, { level: messages.info }, [
            createElementWithTag(
              "div",
              {},
              `
                            Prices have a period of validity: they are valid from <beginning date> to <end date>.
                            A price can be modified only if the <beginning date> is still in the future (5 days from now).
                            To create a new price list:
                        `
            ),
            createElementWithTag("ul", {}, [
              createElementWithTag(
                "li",
                {},
                "Generate a new price list, and choose the <beginning date>."
              ),
              createElementWithTag("li", {}, "Specify the various price items.")
            ]),
            createElementWithTag(
              "div",
              {},
              "You can delete the price list, if it is necessary, while not being less than 5 days from the activation date <beginning date>."
            )
          ])
        ]),
        (this._addOne = createElementWithObject(
          XGroupPanel,
          { title: "Add a new price list" },
          [
            createElementWithObject(
              XButton,
              { action: XButton.Save, id: "button_create" },
              "Create a new price list",
              (el) => el.addEventListener("click", () => this.actionCreate())
            )
          ]
        ))
      ])),
      (this._requestor = createElementWithObject(XRequestor, {}, [
        (this._form = createElementWithObject(XForm, { id: "editForm" }, [
          // TODO: use XTable
          createElementWithTag(
            "div",
            {
              style: {
                width: "100%",
                overflowX: "auto"
              }
            },
            [
              (this._table = createElementWithTag("table", {
                class: "table table-hover table-bordered tablesorter reporting",
                id: "price_lists"
              }))
            ]
          )
        ]))
      ]))
    );
    this.refresh();
  }

  refresh() {
    return this._requestor
      .request(pricesCrud().list())
      .then((response) => response.data)
      .then((data) => sortPrices(data))
      .then((data) => (this.prices = data))
      .then(() => {
        const oneIsEditable = this.prices
          .map((p) => p._editable)
          .reduce((acc, val) => acc || val, false);
        if (oneIsEditable) {
          this._addOne.setAttribute("hidden", "hidden");
        } else {
          this._addOne.removeAttribute("hidden");
        }

        this._table.innerHTML = "";
        this._table.append(
          createElementWithTag("thead", {}, [
            createElementWithTag("tr", {}, [
              createElementWithTag("th", {}, "Beginning date"),
              ...this.prices.map((p) =>
                createElementWithTag("th", {}, p.date_from)
              )
            ]),
            createElementWithTag("tr", {}, [
              createElementWithTag("th", {}, "End date"),
              ...this.prices.map((p) =>
                createElementWithTag("th", {}, p.date_to)
              )
            ]),
            createElementWithTag("tr", {}, [
              createElementWithTag("th", {}, "Modified by"),
              ...this.prices.map((p) =>
                createElementWithTag("th", {}, p.last_user)
              )
            ]),
            createElementWithTag("tr", {}, [
              createElementWithTag("th", {}, ""),
              ...this.prices.map((p) =>
                createElementWithTag("th", {}, [
                  createElementWithObject(XButtons, {}, [
                    p._editable && this.editId == p.id
                      ? createElementWithObject(
                          XButton,
                          { action: XButton.Save },
                          [],
                          (el) =>
                            el.addEventListener("click", () =>
                              this.actionSave()
                            )
                        )
                      : null,
                    p._editable && this.editId == p.id
                      ? createElementWithObject(
                          XButton,
                          { action: XButton.Cancel },
                          [],
                          (el) =>
                            el.addEventListener("click", () =>
                              this.actionCancel()
                            )
                        )
                      : null,
                    p._editable && this.editId != p.id
                      ? createElementWithObject(
                          XButton,
                          { action: XButton.Edit },
                          [],
                          (el) =>
                            el.addEventListener("click", () =>
                              this.actionEdit(p.id)
                            )
                        )
                      : null,
                    p._editable
                      ? createElementWithObject(
                          XButton,
                          { action: XButton.Delete },
                          [],
                          (el) =>
                            el.addEventListener("click", () =>
                              this.actionDelete(p.id)
                            )
                        )
                      : null,
                    p._editable ? null : "Locked"
                  ])
                ])
              )
            ])
          ]),
          createElementWithTag("tbody", {}, [
            ...this.getElements(this.prices).map((k) =>
              createElementWithTag("tr", {}, [
                createElementWithTag("td", {}, k),
                ...this.prices.map((p) =>
                  this.editId == p["id"]
                    ? // We are editing it
                      createElementWithTag("td", {}, [
                        createElementWithObject(XPriceItemEdit, {
                          name: k,
                          value: p[k]
                        })
                      ])
                    : createElementWithTag(
                        "td",
                        {},
                        parseInt(p[k]) <= 0 ? "-" : p[k] == "1" ? "open" : p[k]
                      )
                )
              ])
            )
          ])
        );
      });
  }

  // Filter elements out that does not need to be displayed !
  getElements(prices) {
    if (!prices || prices.length == 0 || !prices[0]) {
      return [];
    }
    let list = Object.keys(prices[0]);
    list = list.filter((v) => {
      if (v[0] == "$") {
        return false;
      }
      if (v[0] == "_") {
        return false;
      }
      if (v == "created_at") {
        return false;
      }
      if (v == "updated_at") {
        return false;
      }
      if (v == "date_from") {
        return false;
      }
      if (v == "date_to") {
        return false;
      }
      if (v == "last_user") {
        return false;
      }
      if (v == "id") {
        return false;
      }
      if (v.substring(0, 23) == "social_level_percentage") {
        return false;
      }
      return true;
    });
    list.sort();
    return list;
  }

  actionCreate() {
    const minimalDate = new Date();
    minimalDate.setDate(minimalDate.getDate() + 5);

    createOverlay()
      .withClass("pivot")
      .withTexts([
        createElementWithTag(
          "div",
          {},
          "When will the new price list be active? Please choose the pivot date:"
        )
      ])
      .withForm(
        [
          createElementWithObject(XLabel, { label: "Pivot date" }, [
            createElementWithObject(XInputDate, { name: "pivot" })
          ])
        ],
        (data) => {
          if (new Date(data.pivot) < minimalDate) {
            return "The date must be in the future, at least 5 days from now.";
          }
          return true;
        }
      )
      .withButtons([XButton.Cancel, XButton.Save])
      .go()
      .then((result) => {
        if (result.action == XForm.ActionSubmit) {
          return this._requestor
            .request(pricesCrud().create({ pivot: result.data.pivot }))
            .then((response) => response.data)
            .then((data) => this.actionEdit(data.id));
        }
      });
  }

  /**
   * Delete an existing price list
   *
   * @param {number} id to delete
   * @returns {Promise} when completed
   */
  actionDelete(id) {
    return this._requestor
      .request(pricesCrud().delete(id))
      .then(() => this.actionCancel());
  }

  /**
   * Edit an existing price list
   *
   * @param {number} id to edit
   */
  actionEdit(id) {
    this.editId = id;
    this.refresh();
  }

  /**
   * Finish editing -> cancel
   *
   * use the currently editing price
   */
  actionCancel() {
    this.editId = null;
    this.refresh();
  }

  /**
   * Finish editing -> save modifications
   *
   * use the currently editing price
   *
   * @returns {Promise} when completed
   */
  actionSave() {
    const data = this._form.getValues();
    return this._requestor
      .request(pricesCrud().update(this.editId, data))
      .then(() => overlayAcknowledge("Price is saved"))
      .then(() => this.actionCancel());
  }
}

customElements.define(XPagePrices.Tag, XPagePrices);
