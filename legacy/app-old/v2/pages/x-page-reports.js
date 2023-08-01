import ExcellentExport from "excellentexport";
import { messages } from "../../config.js";
import {
  createElementsFromHTML,
  createElementWithObject,
  createElementWithTag,
  defineCustomElement
} from "../js/custom-element.js";
import date2CanonicString from "../js/date2CanonicString.js";
import { getPref, setPref } from "../js/prefs.js";
import {
  getRouteToFolderFileByParams,
  getRouteToFolderPatient
} from "../js/router.js";
import { getSession } from "../js/session.js";
import { toSentenceCase } from "../js/string-utils.js";
import XCodage from "../widgets/func/x-codage.js";
import XForm from "../widgets/func/x-form.js";
import XInputList from "../widgets/data/x-input-list.js";
import XIoBoolean from "../widgets/io/x-io-boolean.js";
import XRequestor from "../widgets/func/x-requestor.js";
import XTable from "../widgets/x-table.js";
import XButton from "../widgets/style/x-button.js";
import XButtons from "../widgets/func/x-buttons.js";
import XDisplayDate from "../widgets/style/x-display-date.js";
import XGroupPanel from "../widgets/style/x-group-panel.js";
import XLabel from "../widgets/style/x-label.js";
import XMessages from "../widgets/func/x-messages.js";
import XAge from "../widgets/func/x-age.js";
import XInputDate from "../../v1/elements/x-input-date.js";
import pageStyles from "./page-helper.js";
import "../widgets/func/x-i18n.js";
import { reportQueryBuilder } from "../widgets/func/requests-reports.js";
import { ifError } from "../js/number-utils.js";

/**
 * Two parts here:
 * - query with parameters
 * - results to be instanciated by ?
 */

export default class XPageReports extends HTMLElement {
  /** @type {XRequestor} */
  _requestor;

  /** @type {XForm} */
  _form;

  /** @type {XTable} */
  _result;

  /** @type {HTMLAnchorElement} */
  _exportLink;

  /** @type {XMessages} */
  _messages;

  /** @type {*} */
  _data;

  /**
   * @returns {*} description of the report
   */
  getReportDescription() {
    return {
      dataTransform: (data) => data,
      ...reports[this.reportId]
    };
  }

  /**
   * @param {string} p parameter name
   * @returns {boolean} if the parameter is available
   */
  isParam(p) {
    return this.getReportDescription().params.indexOf(p) >= 0;
  }

  connectedCallback() {
    this.reportId = this.getAttribute("report");

    this.append(
      pageStyles(this),
      // TODO: only two-columns on large screens !
      createElementWithTag(
        "style",
        {},
        `

x-page-reports {
    width: 100%;
    display: flex;
}

x-page-reports > x-requestor,
x-page-reports > x-requestor > *
{
    width: 100%;
}

@media screen and (min-width: 600px) {
    .top {
        display: flex;
        flex-direction: row;
    }

    .top > * {
        flex-basis: 1px;
        flex-grow: 1;
    }
}

#separator {
    height: 30px;
}

x-button#export {
    margin-bottom: 10px;
}
        `
      ),

      (this._requestor = createElementWithObject(XRequestor, { full: true }, [
        createElementWithTag("div", { class: "top", full: true }, [
          createElementWithTag("div", {}, [
            createElementWithTag("h1", {}, this.getReportDescription().name),
            createElementWithTag(
              "div",
              {},
              createElementsFromHTML(this.getReportDescription().description)
            )
          ]),
          createElementWithTag("div", {}, [
            createElementWithObject(XGroupPanel, { title: "Parameters" }, [
              (this._form = createElementWithObject(
                XForm,
                { id: "report_input" },
                [
                  (this._params = createElementWithTag("span")),
                  (this._messages = createElementWithObject(XMessages)),
                  createElementWithObject(XButtons, { slot: "buttons" }, [
                    createElementWithObject(XButton, {
                      action: XButton.Search
                    }),
                    createElementWithObject(XButton, { action: XButton.Reset })
                  ])
                ],
                (el) => {
                  el.addEventListener(XForm.ActionSubmit, () => this.query());
                  el.addEventListener(XForm.ActionReset, () => this.reset());
                }
              ))
            ])
          ])
        ]),
        createElementWithTag("div", { id: "separator" }),

        // Report result
        createElementWithTag("div", { style: { textAlign: "right" } }, [
          // createElementsFromHTML('<a style="display: none" id="report_download_button" download="export.xls">download</a>')[0],
          (this._exportLink = /** @type {HTMLAnchorElement} */ (
            createElementWithTag(
              "a",
              { style: { display: "none" } },
              "download"
            )
          )),
          createElementWithObject(
            XButton,
            { action: XButton.Alternate, id: "export" },
            "Export to Excel",
            (el) => el.addEventListener("click", () => this.generateXLS())
          )
        ]),
        (this._result = createElementWithObject(
          XTable,
          { id: "report_table" },
          [],
          (/** @type {XTable} */ el) => {
            el.enrichTable({ class: "reporting" }); // table table-hover table-bordered tablesorter

            this.getReportDescription().generator(el);
          }
        ))
      ]))
    );

    //
    // center
    //
    if (this.isParam("center")) {
      this._params.insertAdjacentElement(
        "beforeend",
        createElementWithObject(XLabel, { label: "Center" }, [
          createElementWithObject(XInputList, {
            name: "center",
            nullable: true,
            listName: "Centers"
          })
        ])
      );
    }

    //
    // Examiner
    //
    if (this.isParam("examiner")) {
      this._params.insertAdjacentElement(
        "beforeend",
        createElementWithObject(XLabel, { label: "Examiner" }, [
          createElementWithObject(XInputList, {
            name: "examiner",
            nullable: true,
            listName: "Examiners"
          })
        ])
      );
    }

    //
    // Period
    //
    //    fields can be set because of "period" or because they are explicitely wanted
    //    ex: day from consultation
    //
    const periodList = ["day", "month", "year"];
    const switchPeriod = (period) => {
      periodList.forEach((e) => {
        const xlb = /** @type {XLabel} */ (
          this._params.querySelector(`x-label[period="${e}"]`)
        );
        if (period == e) {
          xlb.style.display = xlb.constructor.DISPLAY_MODE;
          xlb
            .querySelectorAll("input")
            .forEach((el) => el.removeAttribute("disabled"));
        } else {
          xlb.style.display = "none";
          xlb
            .querySelectorAll("input")
            .forEach((el) => el.setAttribute("disabled", "disabled"));
        }
      });
    };

    // Period selector
    if (this.isParam("period")) {
      this._params.insertAdjacentElement(
        "beforeend",
        createElementWithObject(XLabel, { label: "Period" }, [
          (this._periodSelector = createElementWithObject(
            XInputList,
            { name: "period", list: periodList, value: "month" },
            [],
            // On change, show the correct input value
            (/** @type {XInputList} */ el) =>
              el.addEventListener("change", () => switchPeriod(el.value))
          ))
        ])
      );
    }

    if (this.isParam("period") || this.isParam("day")) {
      this._params.insertAdjacentElement(
        "beforeend",
        createElementWithObject(XLabel, { label: "Day", period: "day" }, [
          createElementWithObject(XInputDate, { name: "day" })
        ])
      );
    }

    if (this.isParam("period") || this.isParam("month")) {
      this._params.insertAdjacentElement(
        "beforeend",
        createElementWithObject(
          XLabel,
          { label: "Month (yyyy-mm)", period: "month" },
          [
            createElementWithTag("input", {
              name: "month",
              pattern: "[0-9]{4}-[0-9]{1,2}",
              placeholder: "yyyy-mm"
            })
          ]
        )
      );
    }

    if (this.isParam("period") || this.isParam("year")) {
      this._params.insertAdjacentElement(
        "beforeend",
        createElementWithObject(
          XLabel,
          { label: "Year (yyyy)", period: "year" },
          [
            createElementWithTag("input", {
              name: "year",
              type: "number",
              min: 1990,
              max: 2100
            })
          ]
        )
      );
    }

    if (this.isParam("period")) {
      switchPeriod(this._periodSelector.value);
    }

    //
    // Activity
    //
    if (this.isParam("activity")) {
      this._params.insertAdjacentElement(
        "beforeend",
        createElementWithObject(XLabel, { label: "Activity" }, [
          createElementWithObject(XInputList, {
            name: "activity",
            nullable: true,
            list: ["consult", "workshop", "surgical"]
          })
        ])
      );
    }

    //
    // Is Child
    //
    if (this.isParam("is_child")) {
      this._params.insertAdjacentElement(
        "beforeend",
        createElementWithObject(XLabel, { label: "Child only" }, [
          createElementWithObject(XIoBoolean, { name: "is_child", input: true })
        ])
      );
    }

    //
    // Is Complete
    //
    if (this.isParam("is_complete")) {
      this._params.insertAdjacentElement(
        "beforeend",
        createElementWithObject(XLabel, { label: "Complete only" }, [
          createElementWithObject(XIoBoolean, {
            name: "is_complete",
            input: true
          })
        ])
      );
    }

    //
    // Is poverty
    //
    if (this.isParam("is_poor")) {
      this._params.insertAdjacentElement(
        "beforeend",
        createElementWithObject(XLabel, { label: "Poor only" }, [
          createElementWithObject(XIoBoolean, { name: "is_poor", input: true })
        ])
      );
    }

    this.reset();
  }

  // TODO: warning on "year"

  empty() {
    this._messages.clear();
    this._result.block("No data");
    this._result.clear();
  }

  reset() {
    this.empty();
    this._messages.addMessage({
      text: 'Please press "refresh" to generate the report',
      level: messages.info
    });

    //
    // Reset values to saved preferences
    //

    const prefs = {
      center: "",
      examiner: "",
      period: "month",
      activity: "",
      day: new Date(),
      month: date2CanonicString(new Date()).substring(0, 7),
      year: date2CanonicString(new Date()).substring(0, 4),
      is_complete: false,
      is_child: false,
      is_poor: false,
      ...getPref("report")
    };
    this._form.setValues(prefs);
  }

  query() {
    this.empty();

    const newValues = this._form.getValues();

    //
    // Set the preferences
    //
    var prefs = {};
    for (var p in this.getReportDescription().params) {
      let n = this.getReportDescription().params[p];
      let v = newValues[n];
      if (n == "period") {
        let pn = v;
        let pv = newValues[pn];
        prefs[pn] = pv;
      }
      prefs[n] = v;
    }
    setPref("report", prefs);

    if (this.getReportDescription().fixedParams) {
      Object.assign(newValues, this.getReportDescription().fixedParams);
    }

    // Check input data:
    if (this.isParam("period")) {
      let period = newValues["period"];
      let value = newValues[period];
      if (!value) {
        this._messages.addMessage({
          text: `Invalid period (${period})`,
          level: messages.error
        });
        return;
      }
    }

    // Launch the call
    this._requestor
      .request(reportQueryBuilder(this.reportId, newValues))
      .then((response) => response.data)
      // .then(data => {
      //     return {
      //         ...data,
      //         list: this.getReportDescription().dataTransform(data.list)
      //     };
      // })
      .then((data) => {
        this._messages.clear();

        /* For context */

        if (!data || data.list.length < 1) {
          this._result.block();
          return;
        }

        this.data = data;

        //
        // Export button
        //    Calculate the filename
        //
        this._exportLink.setAttribute(
          "download",
          this.generateReportFilename()
        );
        this._result.setData(this.data.list, this.data);
      });
  }

  generateReportFilename(ext = "xls") {
    let filename = `cryptomedic-${this.reportId}`;
    for (const i in this.getReportDescription().params) {
      const p = this.getReportDescription().params[i];
      if (this.data.params[p]) {
        if (p == "period") {
          filename += "-" + this.data.params["when"];
        } else if (typeof this.data.params[p] == "boolean") {
          if (this.data.params[p]) {
            filename += "-" + p;
          }
        } else {
          filename += "-" + ("" + this.data.params[p]).split(" ").join("_");
        }
      }
    }
    return filename + "." + ext;
  }

  generateXLS() {
    // TODO: check fixValue (see website) => on the fly filtering
    this._result
      .querySelectorAll("[printing]")
      .forEach((el) => el.replaceWith(el.getAttribute("printing")));
    this._result
      .querySelectorAll(".online")
      .forEach((el) => el.parentNode.removeChild(el));
    this._result
      .querySelectorAll("a")
      .forEach((el) =>
        el.parentNode.replaceChild(
          createElementWithTag("span", {}, el.innerHTML),
          el
        )
      );
    this._result
      .querySelectorAll("x-codage")
      .forEach((el) =>
        el.parentNode.replaceChild(
          createElementWithTag("span", {}, [el.innerHTML]),
          el
        )
      );
    this._result
      .querySelectorAll("x-io-boolean")
      .forEach((el) =>
        el.parentNode.replaceChild(
          createElementWithTag("span", {}, [el.value ? "1" : "0"]),
          el
        )
      );

    // bug fix here: https://github.com/jmaister/excellentexport/issues/54
    // https://www.npmjs.com/package/excellentexport
    ExcellentExport.excel(
      this._exportLink,
      this._result.getElementsByTagName("table")[0],
      "cryptomedic"
    );
    // TODO:
    // ExcellentExport.convert({
    //   anchor: this._exportLink,
    //   format: 'xlsx',
    //   // filename:
    // }, [
    //   {
    //     name: 'cryptomedic',
    //     from: {
    //       table:  this._result.getElementsByTagName("table")[0]
    //     }
    //   }
    // ]);

    this._exportLink.click();

    // Refresh the table to recover links etc...
    // TODO: this.draw();
  }
}

// TODO: remove addDetailsLegacy

defineCustomElement(XPageReports);

export const REPORT_ACTIVITY = "activity";
export const REPORT_CASH_REGISTER = "cash-register";
export const REPORT_CONSULTATIONS = "consultations";
export const REPORT_FINANCIAL = "financial";
export const REPORT_SURGICAL = "surgical";
export const REPORT_SURGICAL_SUGGESTED = "surgical-suggested";
export const REPORT_STATISTICAL = "statistical";

const reports = {};
reports[REPORT_ACTIVITY] = {
  // test data: 2014-05
  name: "Activity (daily/monthly) Report",
  description:
    "If you want to know your activity, choose this report.<br>" +
    "Options: the day, and optionnaly the examiner, the center and type of activity (workshop / consult / surgical / ...).",
  params: ["period", "center", "examiner", "activity"],
  generator: (xtable) => {
    // TODO: this is exactly the same as the SURGICAL REPORT but with a first line different (no "2")
    xtable
      .addHeaders(6)
      .addFooters(2)
      .addDetail(
        (data, i) =>
          createElementWithTag(
            "a",
            {
              href:
                "#" + getRouteToFolderFileByParams(data.pid, "Bill", data.bid)
            },
            `#${i + 1}`
          ),
        {
          headers: [
            "N",
            "",
            (_col, context) => "Daily report of " + context.params.when,
            "SARPV, CHAKARIA DISABILITY CENTER, CHAKARIA, COX'S BAZAR",
            "Name of the project: Rikces in cox' Bazar",
            "SARPV - AMD - KDM"
          ],
          footers: ["", ""]
        }
      )
      .addDetail("date", { headers: ["Date"] })
      .addDetail("examiner", { headers: ["Examiner"] })
      .addDetail(
        (data) => createElementWithObject(XCodage, { value: data.center }),
        { headers: ["Place"] }
      )
      .addDetail("patient_reference", { headers: ["Record n#"] })
      .addDetail("patient_name", {
        headers: ["Patient Name", "Identity", "Where", "When", "Who"]
      })
      .addDetail(
        (data) =>
          createElementWithObject(XAge, {
            value: data.year_of_birth,
            ref: data.date
          }),
        {
          headers: [
            "Age",
            null,
            (_col, context) => context.params.center,
            (_col, context) => context.params.when,
            (_col, context) => context.params.examiner
          ]
        }
      )
      .addDetail("sex", { headers: ["M/F"] })
      .addDetail(
        (val, _i, context) =>
          val.oldPatient == 1
            ? "Old"
            : val.patient_reference.substr(0, 4) <
              ("" + context.params.when).substr(0, 4)
            ? "Old(EN)"
            : "New",
        { headers: ["Old/New"] }
      )
      .addDetail("sl_family_salary", {
        headers: [
          "Tk income",
          "SEL",
          "0 - 300",
          0,
          "Levels of the social level"
        ]
      })
      .addDetail("sl_number_of_household_members", { headers: ["Nb pers"] })
      .addDetail(
        (data) =>
          ifError(
            Math.round(
              data.sl_family_salary / data.sl_number_of_household_members
            ),
            ""
          ),
        { headers: ["Tk per pers", null, "301-500", 1] }
      )
      .addDetail("social_level", { headers: ["SL"] })

      .addDetail(
        (data) => createElementWithObject(XCodage, { value: data.pathology }),
        { headers: ["Diagno", "Medical", "501-1500", 2] }
      )
      .addDetail("act", { headers: ["Act"] })
      .addDetail("treatment", { headers: ["Trt", null, "1501-3000", 3] })
      .addDetail("last_seen", { headers: ["Last seen", "Surgical"] })
      .addDetail("last_treat_result", {
        headers: ["Result", null, "3001-...", 4]
      })
      .addDetail("last_treat_finished", { headers: ["Done ?", null] })

      .addDetail(
        (data) =>
          data.complementary
            ? createElementWithObject(XCodage, {
                value: "Money collected on bills from previous months",
                translated: "Complementary payments"
              })
            : data.price_consult ?? 0,
        {
          headers: ["Consult", "Price", "", "", ""],
          footers: ["total", XTable.MACROS.sum]
        }
      )

      .addDetail(
        (data) => (data.complementary ? null : data.price_medecine ?? 0),
        { headers: ["Medicine"], footers: [null, XTable.MACROS.sum] }
      )
      .addDetail(
        (data) => (data.complementary ? null : data.price_surgical ?? 0),
        { headers: ["Surgical"], footers: [null, XTable.MACROS.sum] }
      )
      .addDetail(
        (data) => (data.complementary ? null : data.price_workshop ?? 0),
        { headers: ["Workshop"], footers: [null, XTable.MACROS.sum] }
      )
      .addDetail(
        (data) => (data.complementary ? null : data.price_other ?? 0),
        { headers: ["Others"], footers: [null, XTable.MACROS.sum] }
      )
      .addDetail((data) => (data.complementary ? null : data.total_real ?? 0), {
        headers: ["Full"],
        footers: [null, XTable.MACROS.sum]
      })
      .addDetail(
        (data) => (data.complementary ? null : data.total_asked ?? 0),
        { headers: ["Asked"], footers: [null, XTable.MACROS.sum] }
      )
      .addDetail("total_paid", {
        headers: ["Paid"],
        footers: [null, XTable.MACROS.sum]
      })
      .end();
  }
};

reports[REPORT_CASH_REGISTER] = {
  // test data: 2014
  name: "Cash Regsiter",
  description:
    "What is paid relative to what is asked.<br>" +
    "Options: the day and the center.",
  params: ["year"],
  fixedParams: {
    period: "year"
  },
  generator: (xtable) =>
    xtable
      .addHeaders(2)
      .addFooters(1)
      .addDetail("year", { headers: ["Year", "Period"], footers: [""] })
      .addDetail("month", { headers: ["Month"], footers: [""] })

      .addDetail("total_real", {
        headers: ["Total", "Complete"],
        footers: [XTable.MACROS.sum]
      })
      .addDetail("total_asked", {
        headers: ["Asked"],
        footers: [XTable.MACROS.sum]
      })
      .addDetail("paid", {
        headers: ["Paid"],
        footers: [XTable.MACROS.sum]
      })
      .addDetail((data) => data.total_real - data.paid, {
        headers: ["Unpaid"],
        footers: [XTable.MACROS.sum]
      })

      .addDetail("child_total_real", {
        headers: ["Total", "Child"],
        footers: [XTable.MACROS.sum]
      })
      .addDetail("child_total_asked", {
        headers: ["Asked"],
        footers: [XTable.MACROS.sum]
      })
      .addDetail("child_paid", {
        headers: ["Paid"],
        footers: [XTable.MACROS.sum]
      })
      .addDetail((data) => data.child_total_real - data.child_paid, {
        headers: ["Unpaid"],
        footers: [XTable.MACROS.sum]
      })

      .addDetail("poor_child_total_real", {
        headers: ["Total", "Poor and Child"],
        footers: [XTable.MACROS.sum]
      })
      .addDetail("poor_child_total_asked", {
        headers: ["Asked"],
        footers: [XTable.MACROS.sum]
      })
      .addDetail("poor_child_paid", {
        headers: ["Paid"],
        footers: [XTable.MACROS.sum]
      })
      .addDetail((data) => data.poor_child_total_real - data.poor_child_paid, {
        headers: ["Unpaid"],
        footers: [XTable.MACROS.sum]
      })

      .end()
};

reports[REPORT_CONSULTATIONS] = {
  // test data: 2015-04-28
  name: "Consultations planned",
  description:
    "List of consultations planned on a specific day in a specific center.<br>" +
    "See also the button in the menu<br>" +
    "Options: the day and the center.",
  params: ["day", "center"],
  fixedParams: {
    period: "day"
  },
  generator: (xtable) =>
    xtable
      .addHeaders(1)
      .addDetail("c_center", { headers: ["Center"] })
      .addDetail(
        (data) =>
          createElementWithTag(
            "a",
            { href: "#" + getRouteToFolderPatient(data.patient_id) },
            `${data.entry_year}-${data.entry_order}`
          ),
        { headers: ["Patient"] }
      )
      .addDetail("name", { headers: ["Name"] })
      .addDetail("phone", { headers: ["Phone"] })
      .addDetail("examiner", { headers: ["Appointment from"] })
      .addDetail("purpose", { headers: ["Purpose"] })
      .addDetail(
        (data) => createElementWithObject(XDisplayDate, { value: data.c_date }),
        { headers: ["Appointment from"] }
      )
      .end()
};

reports[REPORT_FINANCIAL] = {
  // test data: 2014
  name: "Financial",
  description: "Financial follow-up",
  params: ["period", "is_child", "is_complete", "is_poor"],
  generator: (xtable) =>
    xtable
      .addHeaders(2)
      .addFooters(1)
      .addDetail(
        (data) =>
          createElementWithTag(
            "a",
            { href: "#" + getRouteToFolderPatient(data.pid) },
            data.patient_reference
          ),
        { headers: ["id", "Patient"], footers: [""] }
      )
      .addDetail("patient_name", { headers: ["Name"], footers: [""] })
      .addDetail("age_at_first_consult", {
        headers: ["Age at first consult"],
        footers: [""]
      })
      .addDetail("social_level", {
        headers: ["SL"],
        footers: [""]
      })
      .addDetail(XTable.MACROS.boolean("is_child"), {
        headers: ["Child?"],
        footers: [XTable.MACROS.countBoolean]
      })
      .addDetail("nb_consults", {
        headers: ["# Consults", "Completion"],
        footers: [""]
      })
      .addDetail("nb_pictures", { headers: ["# Pictures"], footers: [""] })
      .addDetail(XTable.MACROS.boolean("is_complete"), {
        headers: ["Complete?"],
        footers: [XTable.MACROS.countBoolean]
      })
      .addDetail("price_consult", {
        headers: ["Consult", "Care categories"],
        footers: [XTable.MACROS.sum]
      })
      .addDetail("price_medecine", {
        headers: ["Medicine"],
        footers: [XTable.MACROS.sum]
      })
      .addDetail("price_surgical", {
        headers: ["Surgical"],
        footers: [XTable.MACROS.sum]
      })
      .addDetail("price_workshop", {
        headers: ["Workshop"],
        footers: [XTable.MACROS.sum]
      })
      .addDetail("price_other", {
        headers: ["Others"],
        footers: [XTable.MACROS.sum]
      })
      .addDetail("total_real", {
        headers: ["Full", "Total"],
        footers: [XTable.MACROS.sum]
      })
      .addDetail("total_asked", {
        headers: ["Asked"],
        footers: [XTable.MACROS.sum]
      })
      .addDetail("total_paid", {
        headers: ["Paid"],
        footers: [XTable.MACROS.sum]
      })
      .end()
};

reports[REPORT_SURGICAL] = {
  // test data: 2014-01
  name: "Surgical Report",
  description: "Follow up of the surgical activity of the period",
  params: ["period"],
  // TODO: legend
  generator: (xtable) => {
    xtable
      .addHeaders(6)
      .addFooters(2)
      .addDetail(
        (data, i) =>
          createElementWithTag(
            "a",
            { href: "#" + getRouteToFolderPatient(data.pid) },
            `#${i + 1}`
          ),
        {
          headers: [
            "N",
            "",
            (_col, context) => "Daily report of " + context.params.when,
            "SARPV, CHAKARIA DISABILITY CENTER, CHAKARIA, COX'S BAZAR",
            "Name of the project: Rikces in cox' Bazar",
            "SARPV - AMD - KDM 2"
          ],
          footers: ["", ""]
        }
      )
      .addDetail("date", { headers: ["Date"] })
      .addDetail("center", { headers: ["Place"] })
      .addDetail("patient_reference", { headers: ["Record n#"] })
      .addDetail("patient_name", {
        headers: ["Patient Name", "Identity", "Where", "When", "Who"]
      })
      .addDetail(
        (data) => createElementWithObject(XAge, { value: data.year_of_birth }),
        {
          headers: [
            "Age",
            null,
            (_col, context) => context.params.center,
            (_col, context) => context.params.when,
            (_col, context) => context.params.examiner
          ]
        }
      )
      .addDetail("sex", { headers: ["M/F"] })
      .addDetail("sl_family_salary", {
        headers: [
          "Tk income",
          "SEL",
          "0 - 300",
          0,
          "Levels of the social level"
        ]
      })
      .addDetail("sl_number_of_household_members", { headers: ["Nb pers"] })
      .addDetail(
        (data) =>
          ifError(
            Math.round(
              data.sl_family_salary / data.sl_number_of_household_members
            ),
            ""
          ),
        { headers: ["Tk per pers", null, "301-500", 1] }
      )
      .addDetail("social_level", { headers: ["SL"] })

      .addDetail(
        (data) => createElementWithObject(XCodage, { value: data.pathology }),
        { headers: ["Diagno", "Medical", "501-1500", 2] }
      )
      .addDetail("last_seen", {
        headers: ["Last seen", "Surgical", "1501-3000", 3]
      })
      .addDetail("last_treat_result", {
        headers: ["Result", null, "3001-...", 4]
      })
      .addDetail("last_treat_finished", { headers: ["Done ?", null] })

      .addDetail("price_consult", {
        headers: ["Consult", "Price", "", "", ""],
        footers: ["total", XTable.MACROS.sum]
      })
      .addDetail("price_medecine", {
        headers: ["Medicine"],
        footers: [null, XTable.MACROS.sum]
      })
      .addDetail("price_surgical", {
        headers: ["Surgical"],
        footers: [null, XTable.MACROS.sum]
      })
      .addDetail("price_workshop", {
        headers: ["Workshop"],
        footers: [null, XTable.MACROS.sum]
      })
      .addDetail("price_other", {
        headers: ["Others"],
        footers: [null, XTable.MACROS.sum]
      })
      .addDetail("total_real", {
        headers: ["Full"],
        footers: [null, XTable.MACROS.sum]
      })
      .addDetail("total_asked", {
        headers: ["Asked"],
        footers: [null, XTable.MACROS.sum]
      })
      .addDetail("total_paid", {
        headers: ["Paid"],
        footers: [null, XTable.MACROS.sum]
      })
      .end();
  }
};

reports[REPORT_SURGICAL_SUGGESTED] = {
  // test data: 2014
  name: "Surgical Suggestions",
  description: "List the suggestions for surgeries.",
  params: ["year"],
  fixedParams: {
    period: "year"
  },
  generator: (xtable) => {
    xtable
      .addHeaders(1)
      .addDetail(
        (data, i) =>
          createElementWithTag(
            "a",
            { href: "#" + getRouteToFolderPatient(data.pid) },
            `#${i + 1}`
          ),
        {
          headers: ["#"]
        }
      )
      .addDetail("patient_reference", { headers: ["Ref"] })
      .addDetail("patient_name", { headers: ["Name"] })
      .addDetail("year_of_birth", { headers: ["Birth"] })
      .addDetail("sex", { headers: ["sex"] })
      .addDetail("pathology", { headers: ["pathology"] })
      .addDetail("amount_surgeries", { headers: ["# surgeries"] })
      .addDetail("last_surgery", { headers: ["Last Surgery"] })
      .addDetail("suggested_from", { headers: ["Suggested from"] })
      .end();
  }
};

reports[REPORT_STATISTICAL] = {
  // test data:

  // TODO: this report is only an incredible hack !!!
  // Idea: https://stackoverflow.com/a/44092580/1954789

  name: "Statistical Report",
  description:
    "If you want to know the activity of the SARPV CDC on a period, choose this report",
  params: ["period", "center", "examiner"],
  generator: (xtable) => {
    const r = (nbr, n) => Math.round(nbr * Math.pow(10, n)) / Math.pow(10, n);
    const listings = getSession().lists;

    xtable.setData = function (data, context) {
      const params = context.params;

      xtable._overlay.free();
      xtable.removeAttribute("empty");
      xtable.setAttribute("count", "" + data?.length);

      xtable._element.append(
        createElementWithTag(
          "tbody",
          {},
          createElementsFromHTML(`
    <tr><td colspan="2" class="subheader">Requested</td></tr>
    <tr><td>Period</td><td>${params.when}</td></tr>

    <tr><td colspan="2" class="subheader">Diagnostic</td></tr>
    <tr><td>If patient have multiple pathologies, he will be counted more than once</td><td></td></tr>
    <tr><td>Ricket consults</td><td>${
      data.summary.pathologies.rickets.total
    }</td></tr>
    <tr><td>Ricket consults (new only)</td><td>${
      data.summary.pathologies.rickets.new
    }</td></tr>
    <tr><td>Ricket consults (old only)</td><td>${
      data.summary.pathologies.rickets.old
    }</td></tr>
    <tr><td>Club Foots</td><td>${
      data.summary.pathologies.clubfoots.total
    }</td></tr>
    <tr><td>Club Foots (new only)</td><td>${
      data.summary.pathologies.clubfoots.new
    }</td></tr>
    <tr><td>Club Foots (old only)</td><td>${
      data.summary.pathologies.clubfoots.old
    }</td></tr>
    <tr><td>Polio</td><td>${data.summary.pathologies.polio.total}</td></tr>
    <tr><td>Burn</td><td>${data.summary.pathologies.burn.total}</td></tr>
    <tr><td>CP</td><td>${data.summary.pathologies.cp.total}</td></tr>
    <tr><td>Fracture</td><td>${
      data.summary.pathologies.fracture.total
    }</td></tr>
    <tr><td>Infection</td><td>${
      data.summary.pathologies.infection.total
    }</td></tr>
    <tr><td>Congenital</td><td>${
      data.summary.pathologies.congenital.total
    }</td></tr>
    <tr><td>Adult</td><td>${data.summary.pathologies.adult.total}</td></tr>
    <tr><td>Normal</td><td>${data.summary.pathologies.normal.total}</td></tr>
    <tr><td>Other</td><td>${data.summary.pathologies.other.total}</td></tr>
    <tr><td>All consultations</td><td>${
      data.summary.pathologies.total
    }</td></tr>

    <tr><td colspan="2" class="subheader">Patients seen</td></tr>
    <tr><td>Number of patients seen</td><td>${data.summary.nbPatients}</td></tr>

    <tr><td colspan="2" class="subheader">Social Level</td></tr>
    <tr><td>Family income (mean)</td><td>${r(
      data.summary.social_level.familyincome,
      1
    )}</td ></tr>
    <tr><td>Nb household mb (mean)</td><td>${r(
      data.summary.social_level.nbhousehold,
      1
    )}</td ></tr >
    <tr><td>ratio (mean)</td><td>${r(
      data.summary.social_level.familyincome /
        data.summary.social_level.nbhousehold,
      2
    )}</td ></tr >
    ${listings.SocialLevels.map(
      (v) =>
        `<tr><td>Social Level ${v}</td><td>${data.summary.social_level[v]}</td></tr>`
    ).join("\n")}
    <tr><td>All social level together</td><td>${
      data.summary.social_level.total
    }</td></tr>

    <tr><td colspan="2" class="subheader">Where</td></tr>
    ${listings.Centers.map(
      (v) =>
        `<tr><td>@<x-i18n value="${v}"></x-i18n></td><td>${
          data.summary.centers[v] ?? 0
        }</td></tr>`
    ).join("\n")}
    <tr><td>center unspecified</td><td>${
      data.summary.centers.unspecified
    }</td></tr>

    <tr><td colspan="2" class="subheader">Surgical activity</td></tr>
    ${Object.keys(data.summary.count.surgical)
      .map(
        (v) =>
          `<tr><td>${toSentenceCase(v)}</td><td>${
            data.summary.count.surgical[v]
          }</td></tr>`
      )
      .join("\n")}

    <tr><td colspan="2" class="subheader">Medical Activity</td></tr>
    ${Object.keys(data.summary.count.medecine)
      .map(
        (v) =>
          `<tr><td>${toSentenceCase(v)}</td><td>${
            data.summary.count.medecine[v]
          }</td></tr>`
      )
      .join("\n")}

    <tr><td colspan="2" class="subheader">Workshop Activity</td></tr>
    ${Object.keys(data.summary.count.workshop)
      .map(
        (v) =>
          `<tr><td>${toSentenceCase(v)}</td><td>${
            data.summary.count.workshop[v]
          }</td></tr>`
      )
      .join("\n")}

    <tr><td colspan="2" class="subheader">Consult Activity</td></tr>
    ${Object.keys(data.summary.count.consult)
      .map(
        (v) =>
          `<tr><td>${toSentenceCase(v)}</td><td>${
            data.summary.count.consult[v]
          }</td></tr>`
      )
      .join("\n")}

    <tr><td colspan="2" class="subheader">Other activity</td></tr>
    ${Object.keys(data.summary.count.other)
      .map(
        (v) =>
          `<tr><td>${toSentenceCase(v)}</td><td>${
            data.summary.count.other[v]
          }</td></tr>`
      )
      .join("\n")}

    <tr><td colspan="2" class="subheader">Financials</td></tr>

    <tr><td colspan="2" class="subheader">Surgery</td></tr>
    <tr><td>total_real</td><td>${data.summary.financials.surgery.real}</td></tr>
    <tr><td>total_asked</td><td>${
      data.summary.financials.surgery.asked
    }</td></tr>
    <tr><td>total_paid</td><td>${data.summary.financials.surgery.paid}</td></tr>
    <tr><td>total paid / total real</td><td>${r(
      data.summary.financials.surgery.paid /
        data.summary.financials.surgery.real,
      2
    )}</td ></tr >

    <tr><td colspan="2" class="subheader"></td></tr>
    <tr><td colspan="2" class="subheader">Medical (exl. above)</td></tr>
    <tr><td>total real</td><td>${data.summary.financials.medical.real}</td></tr>
    <tr><td>total asked</td><td>${
      data.summary.financials.medical.asked
    }</td></tr>
    <tr><td>total paid</td><td>${data.summary.financials.medical.paid}</td></tr>
    <tr><td>total paid / total real</td><td>${r(
      data.summary.financials.medical.paid /
        data.summary.financials.medical.real,
      2
    )}</td ></tr >

    <tr><td colspan="2" class="subheader"></td></tr>
    <tr><td colspan="2" class="subheader">Workshop (exl. above)</td></tr>
    <tr><td>total real</td><td>${
      data.summary.financials.workshop.real
    }</td></tr>
    <tr><td>total asked</td><td>${
      data.summary.financials.workshop.asked
    }</td></tr>
    <tr><td>total paid</td><td>${
      data.summary.financials.workshop.paid
    }</td></tr>
    <tr><td>total paid / total real</td><td>${r(
      data.summary.financials.workshop.paid /
        data.summary.financials.workshop.real,
      2
    )}</td ></tr >

    <tr><td colspan="2" class="subheader"></td></tr>
    <tr><td colspan="2" class="subheader">Consults (exl. above)</td></tr>
    <tr><td>total real</td><td>${data.summary.financials.consult.real}</td></tr>
    <tr><td>total asked</td><td>${
      data.summary.financials.consult.asked
    }</td></tr>
    <tr><td>total paid</td><td>${data.summary.financials.consult.paid}</td></tr>
    <tr><td>total paid / total real</td><td>${r(
      data.summary.financials.consult.paid /
        data.summary.financials.consult.real,
      2
    )}</td ></tr >

    <tr><td colspan="2" class="subheader"></td></tr>
    <tr><td colspan="2" class="subheader">Others (exl. above)</td></tr>
    <tr><td>total real</td><td>${data.summary.financials.other.real}</td></tr>
    <tr><td>total asked</td><td>${data.summary.financials.other.asked}</td></tr>
    <tr><td>total paid</td><td>${data.summary.financials.other.paid}</td></tr>
    <tr><td>total paid / total real</td><td>${r(
      data.summary.financials.other.paid / data.summary.financials.other.real,
      2
    )}</td ></tr >

    <tr><td colspan="2" class="subheader"></td></tr>
    <tr><td colspan="2" class="subheader">Grand Total</td></tr>
    <tr><td>total real</td><td>${data.summary.financials.total.real}</td></tr>
    <tr><td>total asked</td><td>${data.summary.financials.total.asked}</td></tr>
    <tr><td>total paid</td><td>${data.summary.financials.total.paid}</td></tr>
    <tr><td>total paid / total real</td><td>${r(
      data.summary.financials.total.paid / data.summary.financials.total.real,
      2
    )}</td ></tr >

    <tr><td colspan="2" class="subheader"></td></tr>
    `)
        )
      );
    };

    // dataTransform: (dataList) => {
    //     // dataList = { summary: {...}}

    //     const t = (label) => ({ title: true, label: label, value: null });
    //     const l = (label, value) => ({ title: false, label, value });

    //     const r = (nbr, n) => Math.round(nbr * Math.pow(10, n)) / Math.pow(10, n);
    //     const listings = getSession().lists;

    //     // TODO: should receive a list, and so remplacing here ctx.summary by data[period]
    //     return [

    //         t('Requested'),
    //         l('Period', (row, ctx) => ctx.params.when),

    //         t('Diagnostic'),
    //         l('If patient have multiple pathologies, he will be counted more than once', ''),
    //         l('Ricket consults', (_row) => dataList.summary.pathologies.rickets.total),
    //         l('Ricket consults (new only)', (_row) => dataList.summary.pathologies.rickets.new),
    //         l('Ricket consults (old only)', (_row) => dataList.summary.pathologies.rickets.old),
    //         l('Club Foots', (_row) => dataList.summary.pathologies.clubfoots.total),
    //         l('Club Foots (new only)', (_row) => dataList.summary.pathologies.clubfoots.new),
    //         l('Club Foots (old only)', (_row) => dataList.summary.pathologies.clubfoots.old),
    //         l('Polio', (_row) => dataList.summary.pathologies.polio.total),
    //         l('Burn', (_row) => dataList.summary.pathologies.burn.total),
    //         l('CP', (_row) => dataList.summary.pathologies.cp.total),
    //         l('Fracture', (_row) => dataList.summary.pathologies.fracture.total),
    //         l('Infection', (_row) => dataList.summary.pathologies.infection.total),
    //         l('Congenital', (_row) => dataList.summary.pathologies.congenital.total),
    //         l('Adult', (_row) => dataList.summary.pathologies.adult.total),
    //         l('Normal', (_row) => dataList.summary.pathologies.normal.total),
    //         l('Other', (_row) => dataList.summary.pathologies.other.total),
    //         l('All consultations', (_row) => dataList.summary.pathologies.total),

    //         t('Patients seen'),
    //         l('Number of patients seen', (_row) => dataList.summary.nbPatients),

    //         t('Social Level'),
    //         l('Family income (mean)', (_row) => r(dataList.summary.social_level.familyincome, 1)),
    //         l('Nb household mb (mean)', (_row) => r(dataList.summary.social_level.nbhousehold, 1)),
    //         l('ratio (mean)', (_row) => r(dataList.summary.social_level.familyincome / dataList.summary.social_levell.nbhousehold, 2)),
    //         ...listings.social_level.map(v => l(`Social Level ${v}`, (_row) => dataList.summary.social_levell[v])),
    //         l('All social level together', (_row) => dataList.summary.social_level.total),

    //         t('Where'),
    //         // ...listings.centers.map(v => `<tr><td>@<x-i18n value="${v}"></x-i18n>', (row, ctx) =>   ctx.summary.centers[v] ?? 0),
    //         l('center unspecified', (_row) => dataList.summary.centers.unspecified),

    //         t('Surgical activity'),
    //         ...Object.keys(dataList.summary.count.surgical).map(v => l(toSentenceCase(v), (_row) => dataList.summary.count.surgical[v])),

    //         t('Medical Activity'),
    //         ...Object.keys(dataList.summary.count.medecine).map(v => l(toSentenceCase(v), (_row) => dataList.summary.count.medecine[v])),

    //         t('Workshop Activity'),
    //         ...Object.keys(dataList.summary.count.workshop).map(v => l(toSentenceCase(v), (_row) => dataList.summary.count.workshop[v])),

    //         t('Consult Activity'),
    //         ...Object.keys(dataList.summary.count.consult).map(v => l(toSentenceCase(v), (_row) => dataList.summary.count.consult[v])),

    //         t('Other Activity'),
    //         ...Object.keys(dataList.summary.count.other).map(v => l(toSentenceCase(v), (_row) => dataList.summary.count.other[v])),

    //         t('Financials'),

    //         t('Surgery'),
    //         l('total_real', (_row) => dataList.summary.financials.surgery.real),
    //         l('total_asked', (_row) => dataList.summary.financials.surgery.asked),
    //         l('total_paid', (_row) => dataList.summary.financials.surgery.paid),
    //         l('total paid / total real', (_row) => r(dataList.summary.financials.surgery.paid / dataList.summary.financials.surgery.real, 2)),

    //         t(''),
    //         t('Medical (exl. above)'),
    //         l('total real', (_row) => dataList.summary.financials.medical.real),
    //         l('total asked', (_row) => dataList.summary.financials.medical.asked),
    //         l('total paid', (_row) => dataList.summary.financials.medical.paid),
    //         l('total paid / total real', (_row) => r(dataList.summary.financials.medical.paid / dataList.summary.financials.medical.real, 2)),

    //         t(''),
    //         t('Workshop (exl. above)'),
    //         l('total real', (_row) => dataList.summary.financials.workshop.real),
    //         l('total asked', (_row) => dataList.summary.financials.workshop.asked),
    //         l('total paid', (_row) => dataList.summary.financials.workshop.paid),
    //         l('total paid / total real', (_row) => r(dataList.summary.financials.workshop.paid / dataList.summary.financials.workshop.real, 2)),

    //         t(''),
    //         t('Consults (exl. above)'),
    //         l('total real', (_row) => dataList.summary.financials.consult.real),
    //         l('total asked', (_row) => dataList.summary.financials.consult.asked),
    //         l('total paid', (_row) => dataList.summary.financials.consult.paid),
    //         l('total paid / total real', (_row) => r(dataList.summary.financials.consult.paid / dataList.summary.financials.consult.real, 2)),

    //         t(''),
    //         t('Others (exl. above)'),
    //         l('total real', (_row) => dataList.summary.financials.other.real),
    //         l('total asked', (_row) => dataList.summary.financials.other.asked),
    //         l('total paid', (_row) => dataList.summary.financials.other.paid),
    //         l('total paid / total real', (_row) => r(dataList.summary.financials.other.paid / dataList.summary.financials.other.real, 2)),

    //         t(''),
    //         t('Grand Total'),
    //         l('total real', (_row) => dataList.summary.financials.total.real),
    //         l('total asked', (_row) => dataList.summary.financials.total.asked),
    //         l('total paid', (_row) => dataList.summary.financials.total.paid),
    //         l('total paid / total real', (_row) => r(dataList.summary.financials.total.paid / dataList.summary.financials.total.real, 2)),

    //         t(''),
    //     ];
  }
};
