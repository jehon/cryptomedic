
import JHElement from './jh-element.js';

let selfURL = document.currentScript.src
	.replace(/\/[^/]*\/?$/, '');

export default class XReadBoolean extends JHElement {
	static get properties() {
		return {
			'value': 'Boolean'
		};
	}

	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	render() {
		super.render();

		this.shadowRoot.innerHTML = `
                <img>
              `;
	}

	adapt() {
		super.adapt();

		this.shadowRoot.querySelector('img').setAttribute('src', `${selfURL}/resources/boolean-${this._value ? 'true' : 'false'}.gif`);
	}
}

window.customElements.define('x-read-boolean', XReadBoolean);
