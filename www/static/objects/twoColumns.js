/* global ApplicationException */

class TwoColumns {
	constructor(about, options = {}) {
		this.about = about;
		this.text = '<table style="width: 100%">';
		this.options = Object.assign({}, {
			label: l => l,
			id_scope: ''
		}, options);
	}

	toString() {
		this.text += '</table>';
		return this.text;
	}

	addLine(field) {
		try {
			const val = this.about.assertNumericNotZero(field);
			this.text += `<tr>
				<td>${this.options.label(field)}</td>
				<td><span id='${this.options.id_scope}${field}' name='${field}'>${val}</span></td>
			</tr>`;
		} catch (e) {
			if (!(e instanceof ApplicationException)) {
				throw e;
			}
		}
		return this;
	}

	addLines(fields) {
		for(const field of fields) {
			this.addLine(field);
		}
		return this;
	}
}
