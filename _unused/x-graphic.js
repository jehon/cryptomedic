import {
  getRouteToFolderFile,
  setRoute
} from "../legacy/app-old/v2/js/router.js";
import { fromBirthDateTo } from "../legacy/app-old/v2/widgets/file/x-fff-age.js";

import createCallback from "../legacy/app-old/v2/js/callback.js";
import XWithFolder from "../legacy/app-old/v2/widgets/folder/x-with-folder.js";
import "../legacy/app-old/v2/widgets/style/x-group-panel.js";

const hooverCallback = createCallback("hooverCallback");

/**
 * Transform the value into a readable string
 *
 * @param {number} val the value to display
 * @param {string} varName the variable name in case of error
 * @param {number} low - the lowest acceptable value
 * @param {number} high - the highest acceptable value
 * @returns {string|number} The result (string in case of error)
 */
function valueToDisplay(val, varName, low, high) {
  if (isNaN(val) || !val || typeof val != "number") {
    return "Invalid " + varName;
  }
  val = Math.round(val);
  if (val < low) {
    return val + " too low";
  }
  if (val > high) {
    return val + " too high";
  }
  return val;
}

export default class XGraphic extends XWithFolder {
  onHooverUnsubscribe;

  constructor() {
    super();
    this.adapt();
  }

  connectedCallback() {
    this.onHooverUnsubscribe = hooverCallback.onChange((uid) => {
      this.querySelectorAll("[uid][highlighted]").forEach((e) =>
        e.removeAttribute("highlighted")
      );
      this.querySelectorAll(`[uid=${uid}]`).forEach((e) =>
        e.setAttribute("highlighted", uid)
      );
    });
  }

  disconnectedCallback() {
    this.onHooverUnsubscribe();
  }

  /**
   * Return the age at the time of the file
   *
   * @param {object} file for the age
   * @returns {number} the age as a fractional number of years
   */
  getAge(file) {
    // if (!file.date) {
    //     return NaN;
    // }
    try {
      return fromBirthDateTo(this.folder.getPatient().year_of_birth, file.date);
    } catch (_e) {
      return NaN;
    }
  }

  // Presentation
  getVariableX() {
    return "Age";
  }
  getVariableY() {
    return "Y";
  }
  getImageName() {
    return "image";
  }
  getImageDimensions(_sex) {
    return {
      top: 1,
      bottom: 0,
      left: 0,
      right: 1,
      vtop: 1,
      vbottom: 0,
      vleft: 0,
      vright: 1
    };
  }

  // Data
  getValueX(file) {
    return this.getAge(file);
  }
  getValueY(_file) {
    return 0;
  }

  displayX(file) {
    return valueToDisplay(
      this.getValueX(file),
      this.getVariableX(),
      this.getImageDimensions(this.folder?.getPatient().sexStr()).vleft,
      this.getImageDimensions(this.folder?.getPatient().sexStr()).vright
    );
  }

  displayY(file) {
    return valueToDisplay(
      this.getValueY(file),
      this.getVariableY(),
      this.getImageDimensions(this.folder?.getPatient().sexStr()).vbottom,
      this.getImageDimensions(this.folder?.getPatient().sexStr()).vtop
    );
  }

  isValid(file) {
    if (typeof this.displayX(file) != "number") {
      return false;
    }
    if (typeof this.displayY(file) != "number") {
      return false;
    }
    if (isNaN(/** @type {number}*/ (this.displayX(file)))) {
      return false;
    }
    if (isNaN(/** @type {number}*/ (this.displayY(file)))) {
      return false;
    }
    return true;
  }

  getAbscisse(file) {
    if (!this.isValid(file)) return 0;

    const v = this.getValueX(file);
    const imgDimension = this.getImageDimensions(
      this.folder.getPatient().sexStr()
    );
    const p =
      (v - imgDimension.vleft) / (imgDimension.vright - imgDimension.vleft);
    return (
      (p * (imgDimension.right - imgDimension.left) + imgDimension.left) * 100
    );
  }

  getOrdonnee(file) {
    if (!this.isValid(file)) return 0;

    const v = this.getValueY(file);
    const imgDimension = this.getImageDimensions(
      this.folder.getPatient().sexStr()
    );
    const p =
      (v - imgDimension.vbottom) / (imgDimension.vtop - imgDimension.vbottom);
    return (
      (p * (imgDimension.top - imgDimension.bottom) + imgDimension.bottom) * 100
    );
  }

  adapt() {
    this.innerHTML = `
        <style>
            /********************************************
             *  Marks and graphics
             */
            .mark-container {
                /* position: absolute -> relative to the first non-static element -> relative to 0,0 = pseudo-static */
                position: relative;
            }

            .mark {
                color: red;
                position: absolute;
                margin: 0;
                padding: 0;
                border: 0;
                margin-top: -10px;
            }

            .mark > span {
                margin-left: -50%;
            }

            .mark[highlighted] > span {
                background-color: red;
                color: white;
                z-index: 100;
            }

            tr[highlighted] {
                background-color: gray !important;
            }
        </style>
        <x-group-panel title='${this.getVariableY()} / ${this.getVariableX()}'></x-group-panel>`;

    const fs = this.querySelector("x-group-panel");

    if (!this.folder) {
      fs.insertAdjacentHTML("beforeend", "No patient");
      return;
    }

    if (!this.folder?.getPatient()?.sexStr()) {
      fs.insertAdjacentHTML("beforeend", "Sex of the patient is unknown");
      return;
    }

    fs.insertAdjacentHTML(
      "beforeend",
      `
            <div class='mark-container'>
                <img id='graph' src="/static/img/stats_${this.getImageName()}-${this.folder
                  .getPatient()
                  .sexStr()}.jpg" width='100%'></img>
            </div>
            <table class='colorize datalegend'>
                <thead>
                    <th>Date</th>
                    <th>${this.getVariableX()}</th>
                    <th>${this.getVariableY()}</th>
                    <th>Validity</th>
                </thead>
                <tbody></tbody>
            </table>
        `
    );

    const tableElement = this.querySelector("table > tbody");
    const imgElement = this.querySelector(".mark-container");

    for (const index in this.folder.getFilesRelatedToPatient()) {
      const file = this.folder.getFileRelatedToPatient(index);
      const uid = file.uid();
      tableElement.insertAdjacentHTML(
        "beforeend",
        `
                <tr uid="${uid}"
                    valid="${this.isValid(file) ? "valid" : "invalid"}"
                    ng-class="{ hovered: hovered == $index }"
                >
                    <td>${file.date}</td>
                    <td>${this.displayX(file)}</td>
                    <td>${this.displayY(file)}</td>
                    <td>${this.isValid(file) ? "✓" : "✗"}</td>
                </tr >
            `
      );

      if (this.isValid(file)) {
        imgElement.insertAdjacentHTML(
          "beforeend",
          `
                        <span
                            uid="${uid}"
                            class="mark"
                            style="left: ${this.getAbscisse(
                              file
                            )}%; top: ${this.getOrdonnee(file)}%"
                            ng-class="{ hovered: hovered == $index }"
                        ><span>+</span></span>
                    `
        );
      }
      this.querySelectorAll(`[uid=${uid}]`).forEach((e) =>
        e.addEventListener("click", () => {
          setRoute(getRouteToFolderFile(file));
        })
      );

      this.querySelectorAll(`[uid=${uid}]`).forEach((e) =>
        e.addEventListener("mouseover", () => {
          hooverCallback.set(uid);
        })
      );
    }
  }
}
