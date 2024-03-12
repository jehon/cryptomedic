export default class TwoColumns {
  constructor(about, options = {}) {
    this.closed = false;
    this.about = about;
    this.text = '<table style="width: 100%">';
    this.options = Object.assign(
      {},
      {
        label: (l) => l,
        id_scope: ""
      },
      options
    );
  }

  toString() {
    if (!this.closed) {
      this.text += "</table>";
      this.closed = true;
    }
    return this.text;
  }

  addLine(field, label = null) {
    try {
      const val = this.about.assertNumericNotZero(field);
      this.text += `<tr>
				<td>${label ?? this.options.label(field)}</td>
				<td><span id='${
          this.options.id_scope
        }${field}' name='${field}'>${val}</span></td>
			</tr>`;
    } catch (_e) {
      /* istanbul ignore next: what error could I catch here? */
      // if (!(e instanceof ApplicationException)) {
      // throw e;
      // }
    }
    return this;
  }

  addLines(fields) {
    for (const field of fields) {
      this.addLine(field);
    }
    return this;
  }
}
