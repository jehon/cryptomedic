
import { fn } from './athelpers.js';
import setPropertyOn from '../../app/js/set-property.js';

class XXTestPropertySetForFolder extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = '<div id="yes" with-folder=1></div><div id="no"></div>';
    }
}
window.customElements.define('xx-test-property-for-folder-test', XXTestPropertySetForFolder);

describe(fn(import.meta.url), function () {
    const p = 'folder';
    const obj = { a: 123 };

    describe('with folder', function () {
        withHtml(`<div x-top="1"><div id='yes' with-${p}=1></div><div id='no'></div></div>`, function (element) {
            it('with default behavior', function () {
                expect(element()[p]).toBeUndefined();

                setPropertyOn(element(), p, obj);

                expect(element()[p]).toBeUndefined();
                expect(element().querySelector('div#yes')[p]).toBe(obj);
                expect(element().querySelector('div#no')[p]).toBeUndefined();
            });
        });

        withHtml(`<xx-test-property-for-folder-test with-${p}=1></xx-test-property-for-folder-test>`, function (element) {
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

    describe('with file', function () {
        const p = 'file';
        const prop = 'file';

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

    describe('with exception in childerns', function () {
        const p = 'file';
        const prop = 'file';

        const div = document.createElement('div');
        div.setAttribute('x-top', '1');
        const divY = document.createElement('div');
        divY.setAttribute(`with-${p}`, '1');
        Object.defineProperty(divY, 'file', {
            set: (_v) => { throw 'error'; },
            get: () => 'error'
        });
        const divN = document.createElement('div');

        div.insertAdjacentElement('beforeend', divY);
        div.insertAdjacentElement('beforeend', divN);

        it('with default behavior', function () {
            expect(div[p]).toBeUndefined();

            setPropertyOn(div, p, null);

            expect(div[p]).toBeUndefined();
            expect(divY[prop]).toBe('error');
            expect(divN[prop]).toBeUndefined();
        });

    });

    describe('with exception in shadow childerns', function () {
        const prop = p;

        const xxTest = new XXTestPropertySetForFolder();
        Object.defineProperty(xxTest, prop, {
            set: (_v) => { throw 'error'; },
            get: () => 'error'
        });

        const divY = document.createElement('div');
        divY.setAttribute(`with-${p}`, '1');
        Object.defineProperty(divY, prop, {
            set: (_v) => { throw 'error'; },
            get: () => 'error'
        });
        const divN = document.createElement('div');

        xxTest.shadowRoot.appendChild(divY);
        xxTest.shadowRoot.appendChild(divN);

        it('with default behavior', function () {
            setPropertyOn(xxTest, p, null);

            expect(xxTest[p]).toBe('error');
            expect(divY[prop]).toBe('error');
            expect(divN[prop]).toBeUndefined();
        });

    });
});
