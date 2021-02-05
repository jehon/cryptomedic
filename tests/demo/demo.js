
import { createElementWith, defineCustomElement } from '../../app/js/custom-element.js';

import '../../app/elements/render/x-button.js';
import '../../app/elements/render/x-buttons.js';
import '../../app/elements/render/x-group-panel.js';
import '../../app/elements/render/x-label.js';
import '../../app/elements/render/x-message.js';
import '../../app/elements/render/x-messages.js';

import '../../app/elements/funcs/x-form.js';
import '../../app/elements/funcs/x-i18n.js';

export default class XxTest extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.append(
            createElementWith('h2', {}, 'title'),
            createElementWith('slot'),
            this._code = createElementWith('div', { id: 'code' }),
            createElementWith('style', {}, `
    ::slotted(h1) {
        height: 100%;
        width: 100%;
        background-color: gray;
    }

    #code {
        font-size: 8px;
        padding-top: 10px;
    }`
            )
        );

        this.innerHTML = this.innerHTML.trim();

        if (this.innerHTML.length == 0) {
            this.style.backgroundColor = 'gray';
            this.style.color = 'white';
        }

        try {
            this.type = this.firstChild.tagName.toLowerCase();
            if (this.type.substring(0, 2) != 'x-') {
                this.type = false;
            }
        } catch {
            this.type = '';
        }
    }

    connectedCallback() {
        const code = this.innerHTML;

        this._code.innerHTML = code
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');

        if (!this.hasAttribute('title')) {
            if (this.type) {
                this.setAttribute('title', this.type);
            } else {
                this.setAttribute('title', '...');
            }
        }
        this.shadowRoot.querySelector('h2').innerHTML = this.getAttribute('title');

        // window.addEventListener('hashchange', () => this.onHashChange());
        this.onHashChange();
    }

    onHashChange() {
        const hash = location.hash.replace(/^#/g, '').replace(/\/(.*\/)*/g, '');
        if (hash && (!(',' + hash + ',').includes(`,${this.type},`) || !this.type)) {
            this.setAttribute('invisible', 'invisible');
        } else {
            this.removeAttribute('invisible');
        }
    }
}

defineCustomElement(XxTest);

