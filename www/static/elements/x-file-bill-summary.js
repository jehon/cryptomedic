/* global store,XFileBill */
/* global Data */

const XFileBillSummary = (function() {
	class XFileBillSummary extends XFileBill {
		adapt() {
			super.adapt();

			let html = '';
			html += '<table style="width: 100%;">';
			html += this.addLine('Sociallevel');
			html += this.addLine('total_asked');

			for(const cat of this.categoriesList) {
				for(const p of this.getFieldsBelongingTo(cat)) {
					html += this.addLine(p);
				}
			}

			html += '</table>';
			this.innerHTML = html;
		}

		addLine(field) {
			try {
				const val = this.assertNumericNotZero(field);
				return `<tr>
					<td>${this.label(field)}</td>
					<td><span id='Bill_${field}' name='${field}'>${val}</span></td>
				</tr>`;
			} catch (_e) {
				return '';
			}
		}
	}

	window.customElements.define('x-file-bill-summary', XFileBillSummary);

	return XFileBillSummary;
})();
