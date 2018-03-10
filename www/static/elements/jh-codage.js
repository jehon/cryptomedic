(function() {
    class JHCodage extends JHElement {
        static get properties() {
            return { 
                "value": "string", 
                "translated": "string"
            };
        }

        constructor() {
            super();
            // Create a shadow root
            this.attachShadow({ mode: 'open' });
        }

        adapt() {
            console.log("adapt: ", this._value, this._translated);
            if (this._translated) {
                return this._setTranslated(this._value, this._translated);
            }

            const definitions = store.getState().definitions;

            if (!definitions) {
                return this._setRaw(this._value);
            }

            if (!definitions.codes[this._value]) {
                return this._setRaw(this._value);
            }

            return this._setTranslated(this._value, definitions.codes[this._value]);
        }

        _setTranslated(value, translated) {
            this.setAttribute("calculated-translated", translated);
            this.shadowRoot.innerHTML = `
                <span id='translating' data-toggle='tooltip' data-placement='bottom' title='${value}'>
                    <span id='translated'>${translated}</span>*
                </span>
            `
        }

        _setRaw(value) {
            this.setAttribute("calculated-translated", "");
            this.shadowRoot.innerHTML = `<span id='original'>${value}</span>`
        }
    }

    window.customElements.define('jh-codage', JHCodage);
})();