
(function() {
  class JHCodage extends HTMLElement {
    constructor() {
      super();
      // Create a shadow root
      this.attachShadow({ mode: 'open' });
      this.adapt();
    }

    static get observedAttributes() { return [ 'value', 'translated' ]; }

    attributeChangedCallback(attributeName, oldValue, newValue, namespace) {
      this.adapt();
    }

    adapt() {
      let value      = this.getAttribute("value");
      let translated = this.getAttribute("translated");

      if (translated) {
        return this._setTranslated(value, translated);
      }

      const definitions = store.getState().definitions;

      if (!definitions) {
        return this._setRaw(value);
      }

      if (!definitions.codes[value]) {
        return this._setRaw(value);
      }

      return this._setTranslated(value, definitions.codes[value]);
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
      this.shadowRoot.innerHTML = `
        <span id='original'>${value}</span>
      ` 
    }
  }

  window.customElements.define('jh-codage', JHCodage);
})();
