
(function() {
  const alreadyRun = Symbol("alreadyRun");

  class JHScript extends JHElement {
    constructor() {
      super();
      // To hide the current html
      this.attachShadow({ mode: 'open' });
      
      this.alreadyRun = false;
    }

    static get properties() { return { 
      'disabled': "Boolean" 
    }}

    adapt() {
      if (this.hasAttribute("disabled") || this.disabled) {    
        // Reset
        this[alreadyRun] = false;
        return;
      }

      if (this[alreadyRun]) {
        return;
      }

      let script = "" + this.innerHTML;
      script = he.decode(script);
      try {
        eval(script);
      } catch(e) {
        console.error("j-script error!", e, " @Script = ", script);
      }
      this[alreadyRun] = true;
    }
  }

  window.customElements.define('jh-script', JHScript);
})();
