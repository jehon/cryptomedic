
(function() {
  class JHScript extends HTMLElement {
    constructor() {
      super();
      this.alreadyRun = false;
    }

    static get observedAttributes() { return [ 'disabled' ]; }

    connectedCallback() {
      this.evalue();
    }

    attributeChangedCallback(attributeName, oldValue, newValue, namespace) {
      if (attributeName != 'disabled') {
        return;
      }
      this.evalue();
    }

    evalue() {
      let disabled = false;
      if (this.hasAttribute("disabled")) {
        disabled = this.getAttribute("disabled");
        disabled = JSON.parse(disabled);
      }
      
      if (disabled) {
        // Reset
        this.alreadyRun = false;
        return;
      }

      if (this.alreadyRun) {
        return;
      }

      let script = "" + this.innerHTML;
      eval(script);
      this.alreadyRun = true;
    }
  }

  window.customElements.define('jh-script', JHScript);
})();
