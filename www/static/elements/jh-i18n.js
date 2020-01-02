
(function() {
	class JHI18n extends HTMLElement {
		static get observedAttributes() {
			return [ 'value' ];
		}

		attributeChangedCallback(attributeName, oldValue, newValue) {
			if (newValue) {
				try {
					this.innerHTML = newValue.split(/(?=[A-Z]+[a-z])/).join(' ');
				} catch (_e) {
					this.innerHTML = newValue;
				}
			} else {
				this.innerHTML = '';
			}
		}
	}

	window.customElements.define('jh-i18n', JHI18n);
})();
