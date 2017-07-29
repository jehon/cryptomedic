
let ReadAll = (function() {
  let selfURL = document.currentScript.src
      .replace(/\/[^/]*\/?$/, '');

  class ReadAll extends HTMLElement {
    constructor() {
      super();

      // Create a shadow root
      this.attachShadow({mode: 'open'});
      this.adapt();
    }

    static get observedAttributes() { return ['value']; }

    attributeChangedCallback(attributeName, oldValue, newValue, namespace) {
      switch(attributeName) {
        case "name":
        case 'value':
        case 'type':
          this.adapt();
          break;
      }
    }

    getValue(name) {
      if (!this.hasAttribute(name)) {
        return false;
      }
      let raw = this.getAttribute(name);
      let val = "";
      try {
        return JSON.parse(raw);
      } catch(e) { // SyntaxError
      }
      return raw;
    }

    adapt() {
      let name =     this.getValue("name");
      let value =    this.getValue("value");
      let type =     this.getValue("type");

      if (!type) {
        this.shadowRoot.innerHTML = `<span id='${value}' class='error'>Read: key is not defined: '${type}'</span>`;
        return;
      }

      switch(type) {
        case "timestamp":
          let display = "";
          if (value > "") {
            let date = new Date(Date.parse(value));  
            if (isNaN(date.getYear())) {
              display = "";
            } else {
              display = date.toLocaleDateString() + " " + date.toLocaleTimeString();
            }
          }
          this.shadowRoot.innerHTML = `<span name='${name}'>${display}</span>"`;
          break;
        case "boolean":
          this.shadowRoot.innerHTML = `<read-boolean name='${name}' value='${value}'></read-boolean>`;
          break;

        case "list":
        case "date":
        case "integer":
        case "char":
          if (!value) {
            this.shadowRoot.innerHTML = `<span name='${name}'></span>`;
          } else {
            this.shadowRoot.innerHTML = `<span name='${name}'>${value}</span>`;  
          }
          break;

        case "text":
          if (!value) {
            this.shadowRoot.innerHTML = `<span name='${name}' style='white-space: pre'></span>`;
          } else {
            this.shadowRoot.innerHTML = `<span name='${name}' style='white-space: pre'>${value}</span>`;  
          }
          break;

        default:
          console.error("Type unknown: ", type);
          this.shadowRoot.innerHTML = `<span name='${name}'>unknown type: ${type}</span>`;
          break;
      }
    }
  }

  window.customElements.define('read-all', ReadAll);

  return ReadAll;
})();
