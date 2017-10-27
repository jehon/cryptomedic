
(function() {
  class JHScript extends HTMLElement {
    constructor() {
      super();
      // To hide the current html
      this.attachShadow({ mode: 'open' });
      
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
        if (disabled == 'disabled') {
          disabled = true;
        } else {
          try {
            disabled = JSON.parse(disabled);
          } catch(e) {
            console.log("catched - disabling: ", disabled);
            disabled = true;
          }
        }
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
      script = he.decode(script);
      try {
        eval(script);
      } catch(e) {
        console.error("j-script: error! Script = ", script, " / ", e);
      }
      this.alreadyRun = true;
    }
  }

  window.customElements.define('jh-script', JHScript);
})();
