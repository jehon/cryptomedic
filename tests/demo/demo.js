
import { createElementWithTag, defineCustomElement } from '../../app/js/custom-element.js';

// Must be imported globally
import '../../node_modules/css-inherit/css-inherit.js';

import '../../app/elements/render/x-button.js';
import '../../app/elements/render/x-buttons.js';
import '../../app/elements/render/x-group-panel.js';
import '../../app/elements/render/x-label.js';
import '../../app/elements/render/x-message.js';
import '../../app/elements/render/x-messages.js';
// import '../../app/elements/render/x-overlay.js';
// import '../../app/elements/render/x-panel.js';
import '../../app/elements/render/x-waiting.js';

import '../../app/elements/funcs/x-confirmation.js';
import '../../app/elements/funcs/x-form.js';
import '../../app/elements/funcs/x-i18n.js';
import '../../app/elements/funcs/x-input-list.js';
import XTable from '../../app/elements/funcs/x-table.js';
import '../../app/elements/funcs/x-requestor.js';

const filtersMenu = document.querySelector('xx-test#filters');

export default class XxTest extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.append(
            createElementWithTag('style', {}, `
    :host {
        display: flex;
        flex-direction: column;
    }

    :host([menu]) {
        background-color: lightgray;
        color: gray;
    }

    #content {
        border: dashed 1px gray;
        flex-grow: 1;
    }

    slot {
        display: flex;
        flex-grow: 1;
        flex-direction: column;

        border: dashed 1px gray;
    }

    :host([menu]) slot {
        flex-direction: row;
        flex-wrap: wrap;
    }

    ::slotted(*) {
        flex-grow: 1;
    }

    #code {
        font-size: 8px;
        padding-top: 10px;
    }
`
            ),
            createElementWithTag('h2', {}, 'title'),
            createElementWithTag('slot'),
            // this._code = createElementWithTag('div', { id: 'code' }, 'code')
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
        // this._code.innerHTML = this.innerHTML
        //     .replace(/&/g, '&amp;')
        //     .replace(/</g, '&lt;')
        //     .replace(/>/g, '&gt;')
        //     .replace(/"/g, '&quot;')
        //     .replace(/'/g, '&#039;');

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

        if (this.type) {
            filtersMenu.insertAdjacentElement('beforeend',
                createElementWithTag('span', {}, this.type,
                    el => el.addEventListener('click', () => location.hash += `,${this.type}`)
                ));
        }
    }

    onHashChange() {
        if (this.hasAttribute('menu')) {
            return;
        }
        const hash = location.hash.replace(/^#/g, '').replace(/\/(.*\/)*/g, '');
        if (hash && (!(',' + hash + ',').includes(`,${this.type},`) || !this.type)) {
            this.setAttribute('invisible', 'invisible');
        } else {
            this.removeAttribute('invisible');
        }
    }
}

defineCustomElement(XxTest);

import { API_VERSION } from '../../app/config.js';
import Folder from '../../app/models/Folder.js';

document
    .querySelectorAll('x-requestor[demo-failed]').forEach(
        e =>
            e.request({ url: '/nothing' })
                // Avoid it to appear in logs
                .catch(() => { })
    );

document.querySelectorAll('x-button').forEach(e => e.addEventListener('click', evt => console.info('clicked', evt.target)));
document.querySelectorAll('x-form').forEach(e => e.addEventListener('submit', evt => console.info('clicked', evt.target.data)));

fetch(`../../www/api/${API_VERSION}/tests/references/FolderTest.test1.json`)
    .then(response => response.json())
    .then(data => new Folder(data.folder))
    .then(folder => {
        document.querySelectorAll('[demo-folder="test1"]').forEach(el => {
            el.folder = folder;
            el.querySelectorAll('[with-folder]')
                .forEach(el => el.folder = folder);
        });
    });

document.querySelectorAll('x-table').forEach(
    el => /** @type {XTable} */(el)
        .addHeaders(2)
        .addFooters(2)
        .addSetFormatting((el, data) => el.addEventListener('click', () => console.info(data)))
        .addDetail('c0', { headers: ['hr1c0', 'hr0c0'], footers: ['fr0c0', 'fr1c0'] })
        .addDetail('c1', { headers: ['hr0c1'], footers: ['fr0c1', null] })
        .addDetail('')
        .setData([
            { c0: 'br0c0', c1: 'br0c1' },
            { c0: 'br1c0', c1: 'br1c1' }
        ])
);
