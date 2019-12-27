
'use strict';

(function() {
	class JHKeyToLabel extends HTMLElement {
		static get observedAttributes() {
			return [ 'value' ];
		}

		attributeChangedCallback(attributeName, oldValue, newValue) {
			this.innerHTML = newValue.split(/(?=[A-Z]+[a-z])/).join(' ');
		}
	}

	window.customElements.define('jh-key-to-label', JHKeyToLabel);
})();
