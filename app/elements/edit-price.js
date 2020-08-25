
/* istanbul ignore file */

import JHElement from './jh-element.js';

let uuid = 0;

export default class EditPrice extends JHElement {
    constructor() {
        super();
        // Create a shadow root
        this.attachShadow({ mode: 'open' });
        this.uuid = uuid++;
    }

    static get properties() {
        return {
            value: 'Integer'
        };
    }

    adapt() {
        let html = `
        <div>
          <input type='radio' name='edit_price_radio_${this.uuid}' value='1'  ${this._value == 1 ? 'checked' : ''}                    >Open
          <input type='radio' name='edit_price_radio_${this.uuid}' value='-1' ${this._value == -1 ? 'checked' : ''}                    >Not used
          <input type='radio' name='edit_price_radio_${this.uuid}' value='0'  ${this._value != 1 && this._value != -1 ? 'checked' : ''} >Specified
        </div>
      `;

        if (this._value != -1 && this._value != 1) {
            html += `
          <input type='number' min=2 value='${this._value}'>
        `;
        }
        this.shadowRoot.innerHTML = html;

        this.shadowRoot.querySelectorAll('input[type=radio]').forEach(el => el.onchange = (event => {
            this._value = event.currentTarget.value;
            this.adapt();
        }));

        if (this._value != -1 && this.value != 1) {
            this.shadowRoot.querySelector('input[type=number]').onchange = (event => {
                this._value = event.currentTarget.value;
            });
        }
    }

}

window.customElements.define('edit-price', EditPrice);
