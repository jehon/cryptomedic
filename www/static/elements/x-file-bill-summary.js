/* global store,XFileBill */
/* global Data */

const XFileBillSummary = (function() {
	class XFileBillSummary extends XFileBill {
		adapt() {
			super.adapt();
			this.innerHTML = 'go<br>';
			this.innerHTML += this.addLine('Sociallevel');
			this.innerHTML += this.addLine('total_asked');

		}

		addLine(field) {
			try {
				Data(this.value).assertNumericNotZero(field);
				return `<tr>
					<td><span id='Bill_${field}' name='${field}'>${this.value[field]}</span></td>
					<td>${field}</td>
				</tr>`;
			} catch (_e) {
				return '';
			}
		}
	}

	window.customElements.define('x-file-bill-summary', XFileBillSummary);

	return XFileBillSummary;
})();
