
import '../../app/elements/widgets/generic/x-overlay.js';

import { fn, webDescribe } from './athelpers.js';

import JHElement from '../../app/elements/jh-element.js';

// TODO: use constructor instead of webDescribe

describe(fn(import.meta.url), function () {
    webDescribe('initialized', '<x-overlay><div slot="content">Content</div><div slot="overlay">Overlay</div></x-overlay>', function (element) {
        it('should be hidden when initialized simply', function () {
            expect(element().isBlocked()).toBeFalsy();
            expect(element().shadowRoot.querySelector('#overlay').offsetWidth).toBe(0);
            expect(element().shadowRoot.querySelector('#close').offsetWidth).toBe(0);
            // expect(element().shadowRoot.querySelector('#overlay').style.zIndex).toBe('10');
        });

        it('should show()', function () {
            element().block();
            expect(element().isBlocked()).toBeTruthy();
            expect(element().shadowRoot.querySelector('#overlay').offsetWidth).toBeGreaterThan(0);
        });

        it('should hide()', function () {
            element().free();
            expect(element().isBlocked()).toBeFalsy();
            expect(element().shadowRoot.querySelector('#overlay').offsetWidth).toBe(0);
        });

        it('should be react to clicks', function () {
            expect(element().isBlocked()).toBeFalsy();
            element().block();
            expect(element().isBlocked()).toBeTruthy();
            JHElement.fireOn(element().shadowRoot.querySelector('#close'), 'click');
            expect(element().isBlocked()).toBeFalsy();
        });
    });

    webDescribe('initialized', '<x-overlay closable z-index=123 ><div slot="content">Content</div></x-overlay>', function (element) {
        it('should handle closable parameter', function () {
            element().block();
            expect(element().shadowRoot.querySelector('#close').offsetWidth).toBeGreaterThan(0);
        });
    });
});
