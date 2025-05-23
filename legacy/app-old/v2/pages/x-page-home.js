import "./blocks/x-patient-by-reference.js";

import { icons } from "../../../config.js";
import {
  createElementsFromHTML,
  createElementWithObject,
  createElementWithTag
} from "../js/custom-element.js";
import { toAttributeCase } from "../js/string-utils.js";

import XButtons from "../widgets/func/x-buttons.js";
import XRestricted from "../widgets/func/x-restricted.js";
import XButton from "../widgets/style/x-button.js";
import XGroupPanel from "../widgets/style/x-group-panel.js";
import XPanel from "../widgets/style/x-panel.js";
import XPatientByReference from "./blocks/x-patient-by-reference.js";

import {
  REPORT_ACTIVITY,
  REPORT_CASH_REGISTER,
  REPORT_CONSULTATIONS,
  REPORT_FINANCIAL,
  REPORT_STATISTICAL,
  REPORT_SURGICAL,
  REPORT_SURGICAL_SUGGESTED
} from "../../../../src/config.ts";
import { getRouteToCreateReference, getRouteToReport } from "../js/router.js";
import pageStyles from "./page-helper.js";

/**
 * @param {object} options to generate the XGroupPanel
 * @param {string} options.title - at top
 * @param {string?} options.id - for testing
 * @param {string?} options.versalIcon - to explain
 * @param {string} options.html - to explain
 * @param {string} options.toRoute - where to go when clicking on the button
 * @param {string?} options.buttonText - to explain
 * @param {string?} options.toLocation - location on click
 * @param {string?} options.restrictedBy - to restrict the element
 * @returns {HTMLElement} with the content
 */
function createMenu({
  title,
  restrictedBy = "",
  id = toAttributeCase(title),
  versalIcon = "",
  html,
  toRoute = "",
  toLocation = "",
  buttonText = title
}) {
  /** @type {HTMLElement} */
  let res = createElementWithObject(
    XGroupPanel,
    {
      id: id ? id : toAttributeCase(title),
      title
    },
    [
      versalIcon
        ? createElementWithTag("img", { slot: "versal", src: versalIcon })
        : null,
      ...createElementsFromHTML(
        `<div style="flex-grow: 1" white>${html}</div>`
      ),
      createElementWithObject(XButtons, {}, [
        toRoute || toLocation
          ? createElementWithObject(
              XButton,
              {
                action: XButton.Default,
                "to-route": toRoute ?? false,
                "to-location": toLocation ?? false
              },
              buttonText
            )
          : null
      ])
    ]
  );
  if (restrictedBy) {
    res = createElementWithObject(
      XRestricted,
      { "restricted-by": restrictedBy },
      [res]
    );
  }

  return res;
}

/**
 *
 */
export default class XPageHome extends HTMLElement {
  static get Tag() {
    return "x-page-home";
  }

  constructor() {
    super();
    this.append(
      pageStyles(this.constructor.Tag),
      createElementWithTag(
        "style",
        {},
        `
    .grid {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-evenly;
        align-content: stretch;
    }

    @media screen and (min-width: 600px) {
        .grid > * {
            min-height: 200px;
        }
    }

    .grid > * {
        flex-basis: max(250px, calc(25% - 20px));
        flex-grow: 0;
        flex-shrink: 0;

        width: 100%;

        margin: 10px;
    }

    .grid x-group-panel {
        width: 100%;
    }

    .grid x-group-panel > img[slot=versal] {
        width: 40px;
    }

    .grid > x-restricted > * {
        flex-grow: 1;
    }
`
      ),
      createElementWithObject(XPanel, { full: true }, [
        ...createElementsFromHTML(
          '<h1 id="page_home" class="text - center"><img src="/static/img/home.gif">Home</h1>'
        ),

        createElementWithTag("div", { class: "grid" }, [
          createElementWithObject(XPatientByReference),

          createMenu({
            title: "Create a reference",
            id: "autogenerate-reference",
            versalIcon: icons.models.Patient,
            html: "Create a patient with an <b>autogenerated</b> reference. Auto-generated references start at 10.000. Reference year will be asked on next page.",
            toRoute: getRouteToCreateReference()
          }),

          createMenu({
            title: "Search",
            restrictedBy: "folder.read",
            id: "search_menu",
            versalIcon: "/static/img/patientsSearch.gif",
            html: "Search a patient",
            toRoute: "/search"
          }),

          createMenu({
            title: "Consultations of the day",
            restrictedBy: "planning.execute",
            id: "report_consultations_menu",
            versalIcon: "/static/img/consultOfDay.gif",
            html: "Have a list of the consultations of the day",
            toRoute: getRouteToReport(REPORT_CONSULTATIONS)
          }),

          createMenu({
            title: "Activity Report",
            restrictedBy: "reports.execute",
            id: "report_activity_menu",
            versalIcon: "/static/img/reports.gif",
            html: `
If you want to know your activity, choose this report.<br>
Options: the day, and optionnaly the examiner, the center and type of activity (workshop / consult / surgical / ...).
`,
            toRoute: getRouteToReport(REPORT_ACTIVITY)
          }),

          createMenu({
            title: "Statistical Report",
            restrictedBy: "reports.execute",
            id: "report_statistical_menu",
            versalIcon: "/static/img/reports.gif",
            html: "If you want to know the activity of the SARPV CDC on a period.",
            toRoute: getRouteToReport(REPORT_STATISTICAL)
          }),

          createMenu({
            title: "Cash Register Report",
            restrictedBy: "reports.execute",
            id: "report_cash_register_menu",
            versalIcon: "/static/img/reports.gif",
            html: "If you want to know what is paid according to what is asked.",
            toRoute: getRouteToReport(REPORT_CASH_REGISTER)
          }),

          createMenu({
            title: "Surgical Report",
            restrictedBy: "reports.execute",
            id: "report_surgical_menu",
            versalIcon: "/static/img/reports.gif",
            html: "Follow up of the surgical activity of the period.",
            toRoute: getRouteToReport(REPORT_SURGICAL)
          }),

          createMenu({
            title: "Surgical Suggestions Report",
            restrictedBy: "reports.execute",
            id: "report_surgical_suggested_menu",
            versalIcon: "/static/img/reports.gif",
            html: "List the suggestions for surgeries.",
            toRoute: getRouteToReport(REPORT_SURGICAL_SUGGESTED)
          }),

          createMenu({
            title: "Financial Report",
            restrictedBy: "reports.execute",
            id: "report_financial_menu",
            versalIcon: "/static/img/reports.gif",
            html: "Follow up of the financials.",
            toRoute: getRouteToReport(REPORT_FINANCIAL)
          }),

          createMenu({
            title: "Prices",
            restrictedBy: "price.edit",
            id: "menu_prices",
            versalIcon: "/static/img/prices.png",
            html: "Manage the various prices",
            toRoute: "/prices"
          }),

          createMenu({
            title: "Users management",
            restrictedBy: "users.manage",
            id: "menu_users",
            versalIcon: "/static/img/users.png",
            html: "Manage the users of Cryptomedic.",
            toRoute: "/users"
          }),

          createMenu({
            title: "View matrix",
            restrictedBy: "admin.securityMatrix",
            versalIcon: "/static/img/matrix.png",
            html: "List of rights",
            toLocation: "/api/admin/securityMatrix"
          })
        ])
      ])
    );
  }
}

customElements.define(XPageHome.Tag, XPageHome);
