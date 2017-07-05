
let EditPrice = (function() {
  let uuid = 0;

  class EditPrice  extends HTMLElement {
    constructor() {
      super();
      // Create a shadow root
      this.attachShadow({ mode: 'open' });
      this.uuid = uuid++;
      this.adapt();
    }

    static get observedAttributes() { return [ 'value' ]; }

    attributeChangedCallback(attributeName, oldValue, newValue, namespace) {
      this.value = this.getAttribute("value");
      this.adapt();
    }

    adapt() {
      let html = `
        <div>
          <input type='radio' name='edit_price_radio_${this.uuid}' value='1'  ${this.value == 1  ? 'checked' : '' }                    >Open
          <input type='radio' name='edit_price_radio_${this.uuid}' value='-1' ${this.value == -1 ? 'checked' : '' }                    >Not used
          <input type='radio' name='edit_price_radio_${this.uuid}' value='0'  ${this.value != 1 && this.value != -1 ? 'checked' : '' } >Specified
        </div>
      `;

      if (this.value != -1 && this.value != 1) {
        html += `
          <input type='number' min=2 value='${this.value}'>
        `;
      }
      this.shadowRoot.innerHTML = html;
      
      this.shadowRoot.querySelectorAll('input[type=radio]').forEach(el => el.onchange = (event => {
        this.value = event.currentTarget.value;
        this.adapt();
      }));

      if (this.value != -1 && this.value != 1) {
        this.shadowRoot.querySelector('input[type=number]').onchange = (event => {
          this.value = event.currentTarget.value;
        });
      }
    }
  }

  window.customElements.define('edit-price', EditPrice);

  return EditPrice;
})();
