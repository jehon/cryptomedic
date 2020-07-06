
import WithMixin from '../mixins/with-mixin.js';

export default class XSDWeight extends WithMixin('file-uid', WithMixin('folder', HTMLElement)) {
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
        const _folder = this.getAttribute('folder');
        const _patient = this.getAttribute('patient');

        // this.innerHTML =
    }
}

window.customElements.define('x-sd-weight', XSDWeight);
