
let WriteList = (function() {

  let internalUUID=1;

  class WriteList extends HTMLElement {
    constructor() {
      super();
      this.id = "write-list-" + internalUUID++;
      this.attachShadow({ mode: 'open' });
      this.value = null;
      this.list = [];
      this.nullable = false;
      this.adapt();
    }

    static get observedAttributes() { return [ 'value', 'list', 'nullable' ]; }

    attributeChangedCallback(attributeName, oldValue, newValue, namespace) {
      switch(attributeName) {
        case 'value':
          this.value      = this.getAttribute("value");
          break;
        case 'list':
          this.list       = this.getAttribute("list");
          if (!this.list)  {
            this.list = [];
          } else {
            this.list     = JSON.parse(this.list);
          }
          break;
        case 'nullable':
          this.nullable   = this.hasAttribute("nullable");
          break;
      }
      this.adapt();
    }

    adapt() {
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
              <input name='${this.id}' type='radio' value='${escaped}' ${(this.value == item) ? "checked" : ""}>
              <span>${item}</span>
              <br>
            </span>
        `
      }
      if (this.nullable) {
        res += `
          <span to=''>
            <input name='${this.id}' type='radio' value=''>
            <span>?</span>
            <br>
          </span>
        `;

      }
      res += "</span>";

      // TODO
      // on-tap='updateValueFromSpan'  => register on span[to]
      // on-change='updateValueFromRadio' => register on input[type=radio]

      this.shadowRoot.innerHTML = this._withStyle() + res;
    }

    _asSelect() {
      let res = "<select id='select'>\n";
      // TODO: set initial value
      for(let item of this.list) {
        let escaped = this._escape(item);
        res += `  <option name$='${escaped}' value='${escaped}'>${item}</option>\n`;

      }
      if (this.nullable) {
        res += "  <option name='null' value='' null>?</option>\n";
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

    // SELECT
    updateValueFromSelect() {
      // this.value = this.$$('select').value;
    }

    // RADIO
    updateValueFromRadio() {
      // this.value = this.$$('input[type=radio]:checked').value;
    }

    // RADIO SPAN AROUND
    updateValueFromSpan(event) {
      // this.value = event.currentTarget.to;
    }
  }

  window.customElements.define('write-list', WriteList);

  return WriteList;
})();
