
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

import '../../app/elements/funcs/x-form.js';
import '../../app/elements/funcs/x-i18n.js';
import '../../app/elements/funcs/x-requestor.js';

export default class XxTest extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.append(
            createElementWithTag('style', {}, `
    :host {
        display: block;
        max-height: 100%;
    }

    #content {
        border: dashed 1px gray;
        height: 250px !important;
    }

    ::slotted(h1) {
        height: 100% !important;
        width: 100%;
        background-color: gray;
    }

/*
    #code {
        font-size: 8px;
        padding-top: 10px;
    }
*/
`
            ),
            createElementWithTag('h2', {}, 'title'),
            this._shadowMaxContainer = createElementWithTag('div', { id: 'content' }, [
                createElementWithTag('slot'),
            ]),
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
