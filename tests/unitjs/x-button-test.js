
import { icons, levels } from '../../app/config.js';
import XButton from '../../app/elements/widgets/x-button.js';
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
        expect(el.shadowRoot.querySelector('img').getAttribute('src')).toBe('');
    });

    it('should react to click by event listener', function (done) {
        el.addEventListener('click', (_event) => done());
        el.shadowRoot.querySelector('button').click();
    });

    it('should react to click by onclick', function (done) {
        el.onclick = (_event) => done();
        el.shadowRoot.querySelector('button').click();
    });

    it('should handle to-route attribute', function() {
        setRoute('/');
        el.setAttribute('to-route', '/test');
        el.click();
        expect(getCurrentRoute()).toBe('/test');
    });

    it('should initialize', function () {
        el.setAttribute('level', levels.success);
        el.setAttribute('icon', icons.error);

        expect(el.shadowRoot.querySelector('button')).not.toBeNull();
        expect(el.shadowRoot.querySelector('img').getAttribute('src')).not.toBe('');
    });

    it('should not submit a form', function (done) {
        const f = document.createElement('form');
        f.appendChild(el);

        el.addEventListener('submit', () => done.fail('form has been submitted'));
        el.shadowRoot.querySelector('button').click();
        setTimeout(() => {
            done();
        }, 10);
    });
});
