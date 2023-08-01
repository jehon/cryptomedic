/* istanbul ignore file */

import XFileBill from "./x-file-bill.js";
import TwoColumns from "../../v2/js/twoColumns.js";

export default class XFileBillSummary extends XFileBill {
  adapt() {
    super.adapt();

    const tc = new TwoColumns(this, {
      label: this.label
    });
    tc.addLine("social_level", "Social Level");
    tc.addLine("total_asked", "Total Asked");

    for (const cat of this.categoriesList) {
      tc.addLines(this.getFieldsBelongingTo(cat));
    }

    this.innerHTML = tc.toString();
  }
}

window.customElements.define("x-file-bill-summary", XFileBillSummary);
