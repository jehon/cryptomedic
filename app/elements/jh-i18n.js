
export default class JHI18n extends HTMLElement {
    static get observedAttributes() {
        return [ 'value' ];
    }

    attributeChangedCallback(attributeName, oldValue, newValue) {
        if (newValue) {
            this.innerHTML = newValue.split(/(?=[A-Z]+[a-z])/).join(' ');
        } else {
            this.innerHTML = '';
        }
    }
}

window.customElements.define('jh-i18n', JHI18n);
