import {
  createElementWithObject,
  createElementWithTag
} from "../../js/custom-element.js";
import { routeToFolderPatient } from "../../js/router.js";
import XWithFolder from "./x-with-folder.js";
import XGroupPanel from "../style/x-group-panel.js";
import XLabel from "../style/x-label.js";
import XForm from "../func/x-form.js";
import XIoString from "../io/x-io-string.js";
import XIoNumeric from "../io/x-io-numeric.js";

export default class XFfPatientRelated extends XWithFolder {
  /** @type {XForm} */
  _form;

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    // this.style.width = '100%';
    this.shadowRoot.innerHTML = "";
    this.shadowRoot.append(
      createElementWithObject(
        XGroupPanel,
        { class: "related", title: "Related patient" },
        [
          createElementWithTag("div", { slot: "versal" }, [
            createElementWithTag("img", {
              src: "/static/img/model_patient.gif"
            })
          ]),
          (this._form = createElementWithObject(XForm, { white: true }, [
            createElementWithObject(XLabel, { label: "Reference" }, [
              createElementWithTag("div", {}, [
                createElementWithObject(XIoNumeric, {
                  name: "entry_order",
                  style: { display: "inline-block" }
                }),
                "-",
                createElementWithObject(XIoNumeric, {
                  name: "entry_year",
                  style: { display: "inline-block" }
                })
              ])
            ]),
            createElementWithObject(XLabel, { label: "Name" }, [
              createElementWithObject(XIoString, { name: "name" })
            ]),
            createElementWithObject(XLabel, { label: "Year of Birth" }, [
              createElementWithObject(XIoString, { name: "year_of_birth" })
            ]),
            createElementWithObject(XLabel, { label: "Sex" }, [
              createElementWithObject(XIoString, { name: "sex" })
            ])
          ]))
        ]
      )
    );
    this.addEventListener("click", () =>
      routeToFolderPatient(this.folder.getId())
    );
  }

  adapt() {
    const patient = this.folder.getPatient();
    this._form.setValues(patient);
    const pen = `${patient.entry_year}-${patient.entry_order}`;
    this.setAttribute("patient-entry-number", pen);
  }
}

customElements.define("x-ff-patient-related", XFfPatientRelated);
