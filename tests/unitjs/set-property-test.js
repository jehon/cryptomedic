
import { fn } from './athelpers.js';
import setPropertyOn from '../../app/js/set-property.js';

describe(fn(import.meta.url), function () {
    const obj = { a: 123 };

    describe('with folder', function() {
        const p = 'folder';

        class XXTestPropertySet extends HTMLElement {
            constructor() {
                super();
                this.attachShadow({ mode: 'open' });
                this.shadowRoot.innerHTML = `<div id='yes' with-${p}=1></div><div id='no'></div>`;
            }
        }
        window.customElements.define('xx-test-property-test', XXTestPropertySet);

        withHtml(`<div x-top="1"><div id='yes' with-${p}=1></div><div id='no'></div></div>`, function (element) {
            it('with default behavior', function () {
                expect(element()[p]).toBeUndefined();

                setPropertyOn(element(), p, obj);

                expect(element()[p]).toBeUndefined();
                expect(element().querySelector('div#yes')[p]).toBe(obj);
                expect(element().querySelector('div#no')[p]).toBeUndefined();
            });
        });

        withHtml(`<xx-test-property-test with-${p}=1></xx-test-property-test>`, function (element) {
            it('with default behavior', function () {
                expect(element()[p]).toBeUndefined();
                expect(element().shadowRoot.querySelector('div#yes')[p]).toBeUndefined();
                expect(element().shadowRoot.querySelector('div#no')[p]).toBeUndefined();

                setPropertyOn(element(), p, obj);

                expect(element().shadowRoot.querySelector('div#yes')[p]).toBe(obj);
                expect(element().shadowRoot.querySelector('div#no')[p]).toBeUndefined();
            });
        });
    });

    describe('with file-uid', function() {
        const p = 'file-uid';
        const prop = 'fileUid';

        withHtml(`<div x-top="1"><div id='yes' with-${p}=1></div><div id='no'></div></div>`, function (element) {
            it('with default behavior', function () {
                expect(element()[p]).toBeUndefined();

                setPropertyOn(element(), p, obj);

                expect(element()[p]).toBeUndefined();
                expect(element().querySelector('div#yes')[prop]).toBe(obj);
                expect(element().querySelector('div#no')[prop]).toBeUndefined();
            });
        });
    });
});
