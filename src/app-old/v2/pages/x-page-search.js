import {
  createElementsFromHTML,
  createElementWithObject,
  createElementWithTag,
  defineCustomElement
} from "../js/custom-element.js";
import { getRouteToFolderPatient, setRoute } from "../js/router.js";
import XForm from "../widgets/func/x-form.js";
import XRequestor from "../widgets/func/x-requestor.js";
import XTable from "../widgets/x-table.js";
import XButton from "../widgets/style/x-button.js";
import XButtons from "../widgets/func/x-buttons.js";
import XGroupPanel from "../widgets/style/x-group-panel.js";
import XPanel from "../widgets/style/x-panel.js";
import "../../v1/elements/x-write-list.js";
import pageStyles from "./page-helper.js";
import { patientSearchBuilder } from "../widgets/func/requests-folder.js";

export default class XPageSearch extends HTMLElement {
  constructor() {
    super();
    this.append(
      pageStyles(this),
      createElementWithTag("css-inherit"),
      createElementWithTag(
        "style",
        {},
        `
/* no style defined */
            `
      ),
      ...createElementsFromHTML(
        "<h1><img src='/static/img/patientsSearch.gif'>Search for a patient</h1>"
      ),
      (this._requestor = createElementWithObject(XRequestor, {}, [
        createElementWithObject(XPanel, {}, [
          createElementWithObject(
            XGroupPanel,
            { title: "Search criteria", style: { width: "min(50%, 400px)" } },
            [
              createElementWithObject(XPanel, {}, [
                (this._form = createElementWithObject(
                  XForm,
                  {},
                  [
                    ...createElementsFromHTML(`
						<table>
							<tr>
								<td>Entry Year</td>
								<td><input type='number' name='entryyear' class='form-control' /></td>
							</tr>
							<tr>
								<td>Entry Order</td>
								<td><input type='number' name='entryorder' class='form-control' /></td>
							</tr>
							<tr>
								<td>Name</td>
								<td><input name='Name' class='form-control' /></td>
							</tr>
							<tr>
								<td>Sex</td>
								<td>
									<x-write-list name='Sex' list-name='Sex' list='' nullable></x-write-list>
								</td>
							</tr>
							<tr>
								<td>Year of birth</td>
								<td><input name='Yearofbirth' class='form-control' /></td>
							</tr>
							<tr>
								<td>Telephone</td>
								<td><input name='Telephone' class='form-control' /></td>
							</tr>
							<tr>
								<td>Main Pathology</td>
								<td>
									<x-write-list name='Pathology' list-name='Pathologies' list='' nullable></x-write-list>
								</td>
							</tr>
						</table>
`),
                    createElementWithObject(XButtons, { slot: "buttons" }, [
                      createElementWithObject(XButton, {
                        action: XButton.Search
                      }),
                      createElementWithObject(XButton, {
                        action: XButton.Reset
                      })
                    ])
                  ],
                  (el) => {
                    el.addEventListener(XForm.ActionSubmit, () =>
                      this.search()
                    );
                    el.addEventListener(XForm.ActionReset, () => this.reset());
                  }
                ))
              ])
            ]
          ),
          createElementWithTag("h1", {}, "Results"),
          ...createElementsFromHTML(
            '<div style="text-align: center; color: red">Only the first 100 results are shown</div>'
          ),
          (this._result = createElementWithObject(
            XTable,
            { id: "search_results", full: true },
            [],
            (/** @type {XTable} */ el) =>
              el
                .addHeaders(1)
                .enrichTable({ id: "search_results" })
                .addSetFormatting((el, data) =>
                  el.addEventListener("click", () =>
                    setRoute(getRouteToFolderPatient(data.id))
                  )
                )

                .addDetail(
                  () =>
                    createElementWithTag("img", { src: "/static/img/go.gif" }),
                  { headers: [""] }
                )
                .addDetail((data) => data.entryyear + "-" + data.entryorder, {
                  headers: ["Reference"]
                })
                .addDetail("Name", { headers: ["Name"] })
                .addDetail("Sex", { headers: ["Sex"] })
                .addDetail("Yearofbirth", { headers: ["Year of Birth"] })
                .addDetail("Telephone", { headers: ["Telephone"] })
                .addDetail("Pathology", { headers: ["Pathology"] })
          ))
        ])
      ]))
    );
    this.reset();
  }

  reset() {
    this._result.block("Please fill in the form");
  }

  search() {
    this.setAttribute("status", "searching");
    this.reset();

    return this._requestor
      .request(patientSearchBuilder(this._form.getValues()))
      .then((response) => response.data)
      .then((data) => {
        if (!data || data.length == 0) {
          this._result.block();
          return data;
        }

        this._result.setData(data);
        this.removeAttribute("status");
      });
  }
}

defineCustomElement(XPageSearch);
