/* global store,XFileBill */
/* global Data */

const XFileBillSummary = (function() {
	class XFileBillSummary extends XFileBill {
		adapt() {
			super.adapt();
			let html = '';
			html = 'go<br>';
			html += '<table>';
			html += this.addLine('Sociallevel');
			html += this.addLine('total_asked');
			html += '</table>';
			this.innerHTML = html;
		}

		addLine(field) {
			try {
				const val = this.assertNumericNotZero(field);
				return `<tr>
					<td>${field}</td>
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
