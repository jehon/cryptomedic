
let WriteList = (function() {

  let referencesCB = jQuery.Callbacks("memory");

  class WriteList extends HTMLElement {
    static setReferences(references = {}) {
      if (!references) {
        references = {};
      }
      referencesCB.fire(references);
    }

    static get observedAttributes() { return [ 'value', 'list', 'nullable', 'list-name' ]; }

    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this._initialvalue = null;
      this.references = {};
      this.list = [];
      this.listName = false;
      this.nullable = false;

      referencesCB.add((references) => {
        this.references = references;
        this.adapt();
      });

      this.adapt();
    }

    attributeChangedCallback(attributeName, oldValue, newValue, namespace) {
      switch(attributeName) {
        case 'value':
          this._initialvalue      = this.getAttribute("value");
          if (this._initialvalue == "") {
            this._initialvalue = null;
          }
          break;
        case 'list':
          this.list       = this.getAttribute("list");
          if (!this.list)  {
            this.list = [];
          } else {
            this.list     = JSON.parse(this.list);
          }
          break;
        case 'list-name':
          if (this.hasAttribute("list-name")) {
            this.listName   = this.getAttribute("list-name");  
          } else {
            this.listName = false;
          }
          break;
        case 'nullable':
          this.nullable   = this.hasAttribute("nullable");
          break;
      }
      this.adapt();
    }

    adapt() {
      if (this.listName) {
        if (typeof(this.references[this.listName]) == 'undefined') {
          this.list = [];
        } else {
          this.list = this.references[this.listName];  
        }       
      }
      if (this.list.length == 0) {
        this.mode = 'empty';
        this.shadowRoot.innerHTML = "No list set";
      } else {
        if (this.list.length > 5) {
          this.mode = 'select';
          this._asSelect();
        } else {
          this.mode = 'radio';
          this._asRadio();
        }
      }
      this.setAttribute('mode', this.mode);
    }

    _withStyle() {
      return `
        <style>
          :host {
            display: block;
          }

          #radio {
            width: 100%;

            display: flex;
            flex-wrap: wrap;
          }

          #radio > span {
            display: block;
            width: 50%;
          }

          select {
            width: 100%;
          }
        </style>
      `
    }

    _asRadio() {
      let res = "<span id='radio'>";
      // TODO: set initial value
      for(let item of this.list) {
        let escaped = this._escape(item);
        res += `
            <span to='${escaped}'>
              <input type='radio' value='${escaped}' ${(this._initialvalue == item) ? "checked" : ""}>
              <span>${item}</span>
              <br>
            </span>
        `
      }
      if (this.nullable) {
        res += `
          <span to=''>
            <input type='radio' value='' ${(this._initialvalue == null) ? "checked" : ""}>
            <span>?</span>
            <br>
          </span>
        `;

      }
      res += "</span>";

      this.shadowRoot.innerHTML = this._withStyle() + res;
      this.shadowRoot.querySelectorAll("span[to]").forEach((el) => {
        el.onclick = (event) => {
          el.querySelector('input').setAttribute('checked', true);
        }
      });
    }

    _asSelect() {
      let res = "<select>\n";
      // TODO: set initial value
      for(let item of this.list) {
        let escaped = this._escape(item);
        res += `  <option name$='${escaped}' value='${escaped}' ${(this._initialvalue == item) ? "selected" : ""}>${item}</option>\n`;

      }
      if (this.nullable) {
        res += `  <option name='null' value='' ${(this._initialvalue == null) ? "selected" : ""}>?</option>\n`;
      }
      res += "</select>\n";

      // TODO: Register onclick
      this.shadowRoot.innerHTML = this._withStyle() + res;
    }

    _escape(str) {
      if (str == null) {
        return '';
      }
      return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    get value() {
      let value = null;
      switch(this.getAttribute("mode")) {
        case "select":
          value = this.shadowRoot.querySelector("select").value;
          break;
        case "radio":
          let el = this.shadowRoot.querySelector("input[type=radio][checked]"); 
          if (el) {
            value = el.value;  
          }
          break;
      }
      if (value == "") {
        value = null;
      }
      return value;
    }
  }

  window.customElements.define('write-list', WriteList);

  return WriteList;
})();
