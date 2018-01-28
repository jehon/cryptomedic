(function() {
	const form     = Symbol("form");
	const submit   = Symbol("submit");
	const messages = Symbol("messages");

	class XForm extends JHElement {

		static get properties() {
			return {
				value:  "Object",
			}
		}

		constructor() {
			super();
			this.attachShadow({ mode: 'open' });
			this.shadowRoot.innerHTML = `<div class='container-fluid'>
			  	<div class='row'>
			    </div>
			</div>
			<slot></slot>`;
			this[messages] = this.shadowRoot.querySelector(".row");
		}

		render() {
			// Encapsulate all the form into a classic "form" content
			this[form] = document.createElement('form');
			Array.from(this.children).forEach(el => {
				this[form].appendChild(el);
			});

			/* Simulated submit button */
			this[submit] = document.createElement("input");
			this[submit].setAttribute("type", "submit");
			this[form].appendChild(this[submit]);

			this.appendChild(this[form]);

			this.querySelectorAll("[name]").forEach(el => el.addEventListener("blur", () => { 
				this.onFormUpdated();
			}));
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

		validate() {
			let result = true;

			this.querySelectorAll("[name]").forEach(el => {
				if ("checkValidity" in el) {
					// Store it, because if we don't click, it could not appear
					const res = el.checkValidity();
					result = result && res;
				}
			})

		    if (!this[form].checkValidity()) {
		     	this[submit].click();
		      	return false;
		    }

		    // Use only for custom elements?
		    // if (!result) {
		    // 	return false;
		    // }

		    return true;
		}

		onFormUpdated() {}

		showMessages(list = []) {
			this[messages].innerHTML = "";
			list.forEach(msg => {
				this[messages].insertAdjacentHTML("beforeend", `<div class='alert alert-danger'>${msg}</div>`);
			});
		}

		// onEditChanged() {
		//     this.querySelectorAll(`[name]`).forEach(el => {
		//         if (this.edit) {
		//             el.setAttribute('edit', 'edit');
		//         } else {
		//             el.removeAttribute('edit');
		//         }
		//     })
		// }
	}

	window.customElements.define('x-form', XForm);
})();
