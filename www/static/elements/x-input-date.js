/* global JHElement */

(function () {
	const element = Symbol('element');

	const cleanUpDate = function(val) {
		if (val instanceof Date) {
			val = val.toISOString();
		}
		if (typeof (val) === 'string') {
			val = val.substring(0, 10);
		}

		if (!(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(val))) {
			// Invalid date
			val = '';
		}
		return val;
	};

	class XInputDate extends JHElement {
		static get properties() {
			return {
				value: 'String'
			};
		}

		render() {
			super.render();
			this._value = cleanUpDate(this._value);
			this.innerHTML = `
				<style>
					input {
						border-style: none;
					}
				</style>
				<input type=date value='${this._value}'>
			`;
			this[element] = this.querySelector('input');
			this[element].addEventListener('blur', () => this.fire('blur'));
			this.addEventListener('click', () => {
				this[element].focus();
			});
		}

		onValueChanged() {
			this.value = this._value;
		}

		set value(val) {
			this._value = cleanUpDate(val);
			this[element].value = this._value;
		}

		get value() {
			return this[element].value;
		}
	}

	window.customElements.define('x-input-date', XInputDate);
})();
