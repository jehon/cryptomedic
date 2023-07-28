import {
  createElementWithObject,
  createElementWithTag,
  defineCustomElement
} from "../../js/custom-element.js";
import { getRouteToFolderPatient, setRoute } from "../../js/router.js";
import XForm from "../../widgets/func/x-form.js";
import XRequestor from "../../widgets/func/x-requestor.js";
import XButton from "../../widgets/style/x-button.js";
import XButtons from "../../widgets/func/x-buttons.js";
import XGroupPanel from "../../widgets/style/x-group-panel.js";
import XLabel from "../../widgets/style/x-label.js";
import XPanel from "../../widgets/style/x-panel.js";
import XIoNumeric from "../../widgets/io/x-io-numeric.js";
import {
  checkReferenceBuilder,
  createReferenceBuilder
} from "../../widgets/func/requests-folder.js";

/**
 * Slot: none
 */
export default class XPatientByReference extends HTMLElement {
  constructor() {
    super();

    this.innerHTML = "";
    this.append(
      createElementWithTag("css-inherit"),
      createElementWithTag(
        "style",
        {},
        `
    x-patient-by-reference #creator {
        display: none;
    }

    x-patient-by-reference[status=creation-proposed] #creator {
        display: flex;
    }
            `
      ),
      createElementWithObject(XGroupPanel, { title: "Search by reference" }, [
        (this._requestor = createElementWithObject(XRequestor, {}, [
          (this._form = createElementWithObject(
            XForm,
            {},
            [
              createElementWithTag(
                "div",
                { white: true },
                "Please enter the reference for the patient you want to see"
              ),
              createElementWithObject(
                XLabel,
                { label: "Entry Year" },
                [
                  createElementWithObject(XIoNumeric, {
                    name: "entry_year",
                    input: true,
                    required: true,
                    min: "1990",
                    max: "2100",
                    value: new Date().getFullYear()
                  })
                ],
                (el) => el.addEventListener("change", () => this.reset())
              ),
              createElementWithObject(
                XLabel,
                { label: "Entry Order" },
                [
                  createElementWithObject(XIoNumeric, {
                    name: "entry_order",
                    input: true,
                    required: true,
                    autofocus: true
                  })
                ],
                (el) => el.addEventListener("change", () => this.reset())
              ),
              createElementWithObject(XButtons, { slot: "buttons" }, [
                createElementWithObject(XButton, { action: XButton.Search }),
                createElementWithObject(XButton, { action: XButton.Cancel })
              ])
            ],
            (el) => {
              el.addEventListener(XForm.ActionSubmit, () => this.search());
              el.addEventListener(XForm.ActionReset, () => this.reset());
            }
          )),
          createElementWithTag("br"),
          createElementWithObject(XPanel, { id: "creator" }, [
            createElementWithTag("div", {}, [
              "The patient does not exist. Do you want to create it?"
            ]),
            createElementWithObject(
              XButton,
              {
                action: XButton.Save,
                id: "create-reference",
                style: "min-width: 50%"
              },
              ["Create the patient"],
              (el) => el.addEventListener("click", () => this.createReference())
            )
          ])
        ]))
      ])
    );
  }

  reset() {
    this.removeAttribute("status");
  }

  search() {
    const data = this._form.getValues();
    this.setAttribute("status", "searching");

    return this._requestor
      .request(checkReferenceBuilder(data.entry_year, data.entry_order))
      .then((response) => response.data)
      .then((data) => {
        if (data.id) {
          this.setAttribute("status", "found");
          setRoute(getRouteToFolderPatient(data.id));
        } else {
          this.setAttribute("status", "creation-proposed");
        }
      });
  }

  createReference() {
    const data = this._form.getValues();
    this.setAttribute("status", "creation-requesting");

    return this._requestor
      .request(createReferenceBuilder(data.entry_year, data.entry_order))
      .then((response) => response.data)
      .then((data) => {
        this.setAttribute("status", "creation-requested");
        setRoute(getRouteToFolderPatient(data.id, true));
      });
  }
}

defineCustomElement(XPatientByReference);
