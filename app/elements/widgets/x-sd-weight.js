
export default class XSDWeight extends HTMLElement {
    static get observedAttributes() {
        return ['folder', 'patient'];
    }

    constructor() {
        super();
        this.adapt();
    }

    attributeChangedCallback(_attributeName, _oldValue, _newValue) {
        this.adapt();
    }

    adapt() {
        const folder = this.getAttribute('folder');
        const patient = this.getAttribute('patient');

        // this.innerHTML =
    }
}

window.customElements.define('x-sd-weight', XSDWeight);
