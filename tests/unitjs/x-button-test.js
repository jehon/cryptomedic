
import { actions } from '../../app/config.js';
import XForm from '../../app/elements/funcs/x-form.js';
import XButton from '../../app/elements/render/x-button.js';
import { getCurrentRoute, setRoute } from '../../app/js/router.js';
import { fn } from './athelpers.js';

describe(fn(import.meta.url), function () {
    /** @type {XButton} */
    let el;
    beforeEach(() => {
        el = new XButton();
    });

    it('should initialize', function () {
        expect(el.shadowRoot.querySelector('button')).not.toBeNull();
        expect(el.shadowRoot.querySelector('img').getAttribute('src')).toBeNull();
    });

    it('should react to click by event listener', function (done) {
        el.addEventListener('click', (_event) => {
            expect(true).toBeTrue();
            done();
        });
        el.shadowRoot.querySelector('button').click();
    });

    it('should react to click by onclick', function (done) {
        el.onclick = (_event) => {
            expect(true).toBeTrue();
            done();
        };
        el.shadowRoot.querySelector('button').click();
    });

    it('should handle to-route attribute', function () {
        setRoute('/');
        el.setAttribute('to-route', '/test');
        el.click();
        expect(getCurrentRoute()).toBe('/test');
    });

    it('should initialize', function () {
        el.setAttribute('action', actions.commit);
        el.setAttribute('icon', 'error');

        expect(el.shadowRoot.querySelector('button')).not.toBeNull();
        expect(el.shadowRoot.querySelector('img').getAttribute('src')).not.toBe('');
    });

    it('should initialize', function () {
        el.setAttribute('action', actions.alternate);
        el.setAttribute('icon', 'error');

        expect(el.shadowRoot.querySelector('button')).not.toBeNull();
        expect(el.shadowRoot.querySelector('img').getAttribute('src')).not.toBe('');
    });

    it('should not submit a form', function (done) {
        const f = document.createElement('form');
        f.append(el);

        el.addEventListener(XForm.ActionSubmit, () => done.fail('form has been submitted'));
        el.shadowRoot.querySelector('button').click();
        setTimeout(() => {
            expect(true).toBeTrue();
            done();
        }, 10);
    });
});
