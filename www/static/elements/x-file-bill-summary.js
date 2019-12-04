/* global store,XFileBill, TwoColumns */
/* global Data */

'use strict';

const XFileBillSummary = (function() {
	class XFileBillSummary extends XFileBill {
		adapt() {
			super.adapt();

			const tc = new TwoColumns(this, {
				label: this.label
			});
			tc.addLine('Sociallevel');
			tc.addLine('total_asked');

			for(const cat of this.categoriesList) {
				tc.addLines(this.getFieldsBelongingTo(cat));
			}

			this.innerHTML = tc.toString();
		}
	}

	window.customElements.define('x-file-bill-summary', XFileBillSummary);

	return XFileBillSummary;
})();
