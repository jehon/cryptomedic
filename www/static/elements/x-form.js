// Form + validator
//  - initialize form from data

(function() {
	const form = Symbol["form"];

	class XForm extends JHElement {

		static get properties() {
			return {
				value:  "Object",
			}
		}

		constructor() {
			super();
			this._method = "GET";

            this.attachShadow({ mode: 'open' });
            this.shadowRoot.innerHTML = 
			`<form>
				<slot></slot>
			</form>`;

			this[form] = this.shadowRoot.querySelector("form");
		}

		onValueChanged() {
		    Object.keys(this._value).forEach(k => {
		    	const escaped = k.split('"').join("&quot;");
		        this.querySelectorAll(`[name="${escaped}"]`).forEach(el => {
		        	if (el.matches("input[type=radio]")) {
		        		if (el.value == this._value[k]) {
		        			el.setAttribute("checked", "checked");
		        		} else {
		        			el.removeAttribute("checked");
		        		}
		        	} else {
		        		el.value = this._value[k]
		        	}
		        });
		    });
		    // this._evaluateFunctions();
		}

		rebuildData(prototype = {}) {
			let data = new prototype.constructor();
			Object.assign(data, prototype);

			// We look in the innerHTML (the main component tree), not the shadowRoot
			for (let i of this.querySelectorAll("[name]")) {

				// Skip disabled elements
				if (i.disabled) {
					continue;
				}

				if (i.offsetHeight + i.offsetWidth < 1 && !i.matches("input[type=hidden]")) {
					continue;
				}

				// Skip empty names
				let name = i.getAttribute('name');
				if (!name) {
					continue;
				}

				// Only take the selected radio
				if (i.matches("[type=radio") && !i.matches("[checked]")) {
					continue;
				}

				let value = i.value;

				if (value === "" || value == null) {
					delete(data[name]);
					continue;
				}

				// Treat some special cases
				switch (i.type) {
					case "number":
						value = Number.parseInt(value);
						break;
						/* istanbul ignore next: impossible to fill in a input[type=file] element - see MSDN */
					case "file":
						// http://blog.teamtreehouse.com/uploading-files-ajax
						// We can pass the "File" object to FormData, it will handle it for us....
						if (i.data) {
							value = i.data.data;
						} else {
							value = null;
						}
						break;
				}

				data[name] = value;
			}
			return data;
		}

		// onEditChanged() {
		//     this.querySelectorAll(`[name]`).forEach(el => {
		//         if (mode == "read") {
		//             el.removeAttribute('edit');
		//         } else {
		//             el.setAttribute('edit', tag);
		//         }
		//     })
		// }

		// _evaluateFunctions() {
		    // this[form].querySelectorAll(`[function]`).forEach(el => {
		    //     fn = el.getAttribute('function');
		    //     if (fn in object) {
		    //         el.innerHTML = object[fn]()
		    //     }
		    // });
		// }

		// validate() {
		// }

	}

	window.customElements.define('x-form', XForm);

})();
