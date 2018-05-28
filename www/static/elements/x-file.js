/* global XWaiting,store */

const XFile = (function() {
	class XFile extends XWaiting {
		static get properties() {
			return {
				value: 'Object'
			};
		}

		constructor() {
			super();
			this.block();
			this.data = false;
		}

		get value() {
			return this._value;
		}

		set value(value) {
			this._value = value;
			if (this._value) {
				this.free();
				if (this.isInitialized()) {
					this.adapt();
				}
			} else {
				this.block();
				this.innerHTML = '';
			}
		}

		adapt() {
			// Stub for testing
			super.adapt();
		}
	}

	window.customElements.define('x-file', XFile);

	return XFile;
})();
