
/* istanbul ignore file */

import JHElement from './jh-element.js';
import { getSession } from '../js/session.js';

export default class JHCodage extends JHElement {
    static get properties() {
        return {
            value: 'string',
            translated: 'string'
        };
    }

    constructor() {
        super();
        // Create a shadow root
        this.attachShadow({ mode: 'open' });
    }

    // TODO: should we adapt test for this to works?
    // render() {
    // 	super.render();
    // 	onSession((_session) => {
    //		this.adapt();
    // 	});
    // }

    adapt() {
        if (this._translated) {
            return this._setTranslated(this._value, this._translated);
        }

        const definitions = getSession();

        if (!definitions) {
            return this._setRaw(this._value);
        }

        if (!definitions.codes[this._value]) {
            return this._setRaw(this._value);
        }

        return this._setTranslated(this._value, definitions.codes[this._value]);
    }

    _setTranslated(value, translated) {
        this.setAttribute('calculated-translated', translated);
        this.shadowRoot.innerHTML = `
                <span id='translating' data-toggle='tooltip' data-placement='bottom' title='${value}'>
                    <span id='translated'>${translated}</span>*
                </span>
            `;
    }

    _setRaw(value) {
        this.setAttribute('calculated-translated', '');
        this.shadowRoot.innerHTML = `<span id='original'>${value}</span>`;
    }
}

window.customElements.define('jh-codage', JHCodage);
