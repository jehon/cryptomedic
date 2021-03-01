
/* istanbul ignore file */

import { createElementWithTag, defineCustomElement } from '../../js/custom-element.js';
import fireOn from '../../js/fire.js';
import { getSession } from '../../js/session.js';

let uuid = 1;

/**
 * @param {string} str to be transformed
 *
 * @returns {string} acceptable form for html
 */
function _escape(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;');
}

export default class XInputList extends HTMLElement {
    static get observedAttributes() {
        return ['value', 'list', 'list-name', 'nullable'];
    }

    attributeChangedCallback(attributeName, _oldValue, newValue) {
        switch (attributeName) {
            case 'value':
                this.value = newValue;
                break;

            case 'list':
            case 'list-name':
            case 'nullable':
                this.draw();
                break;
        }
    }


    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.draw();
    }

    draw() {
        this.shadowRoot.append(
            createElementWithTag('style', {}, `
            :host {
                display: block;
            }

            .radio {
                width: 100%;

                display: flex;
                flex-wrap: wrap;
            }

            .radio > span {
                display: block;
                width: 50%;
            }

            select {
                width: 100%;
            }
            `),
        );

        const references = getSession()?.lists ?? [];
        const listName = this.getAttribute('list-name');
        let list = [];

        if (listName) {
            if (!(listName in references)) {
                console.error('List not found: ', listName);
                list = [];
            } else {
                list = references[listName];
            }
        } else {
            if (this.hasAttribute('list') && this.getAttribute('list')) {
                list = JSON.parse(this.getAttribute('list'));
            }
        }

        if (!list || list.length == 0) {
            this.setAttribute('mode', 'empty');
            this.shadowRoot.innerHTML = 'X-Write-List: no list set';
            return;
        }

        const ruuid = uuid++;
        if (list.length > 5) {
            this.setAttribute('mode', 'select');
            const b = (val, txt) => createElementWithTag('option', { value: escape(val) }, txt);

            this.shadowRoot.append(createElementWithTag('select', {},
                [
                    this.hasAttribute('nullable') ? b('', '?') : null,
                    ...list.map(val => b(val, val))
                ],
                el => el.addEventListener('change', () => this.changed())
            ));
        } else {
            this.setAttribute('mode', 'radio');
            const b = (val, txt) => createElementWithTag(
                'span', { to: val },
                [
                    createElementWithTag('input', { type: 'radio', name: `x-input-list-radio-${ruuid}`, value: escape(val) }, [],
                        el => el.addEventListener('change', () => this.changed())
                    ),
                    createElementWithTag('span', {}, txt),
                    createElementWithTag('br')
                ],
                el => {
                    el.addEventListener('click', () => { el.querySelector('input').setAttribute('checked', 'checked'); this.changed(); });
                }
            );

            this.shadowRoot.append(createElementWithTag('span', { class: 'radio' }, [
                this.hasAttribute('nullable') ? b('', '?') : null,
                ...list.map(val => b(val, val))
            ]));
        }

        this.value = '';
    }

    changed() {
        fireOn(this, 'change', this.value);
    }

    set value(value) {
        const escaped = escape(value);
        let el;
        switch (this.getAttribute('mode')) {
            case 'select':
                el = this.shadowRoot.querySelector('select');
                el.value = escaped;
                break;
            case 'radio':
                el = this.shadowRoot.querySelector(`input[type=radio][value="${escaped}"]`);
                if (el == null) {
                    return;
                }
                el.setAttribute('checked', 'checked');
                break;
        }
    }

    get value() {
        let value = null;
        switch (this.getAttribute('mode')) {
            case 'select':
                value = this.shadowRoot.querySelector('select').value;
                break;
            case 'radio':
                { // avoid no-case-declarations
                    const checked = /** @type {HTMLInputElement} */ (this.shadowRoot.querySelector('input[type=radio]:checked'));
                    if (checked == null) {
                        value = null;
                    } else {
                        value = checked.value;
                    }
                }
                break;
        }
        if (value == '' || value == undefined) {
            value = null;
        }
        return value;
    }

}

defineCustomElement(XInputList);
