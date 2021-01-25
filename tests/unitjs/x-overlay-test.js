
import XOverlay from '../../app/elements/widgets/generic/x-overlay.js';

import { fn } from './athelpers.js';

import JHElement from '../../app/elements/jh-element.js';
import { createElementWith } from '../../app/js/custom-element.js';

describe(fn(import.meta.url), function () {
    let element;
    beforeEach(() => {
        element = createElementWith(XOverlay, {}, [
            createElementWith('div', {}, 'Content'),
            createElementWith('div', { slot: 'overlay' }, 'Overlay')
        ]);
    });

    it('should be hidden when initialized simply', function () {
        expect(element.isBlocked()).toBeFalsy();
    });

    it('should block()', function () {
        element.block();
        expect(element.isBlocked()).toBeTruthy();
    });

    it('should free()', function () {
        element.free();
        expect(element.isBlocked()).toBeFalsy();
    });

    it('should be react to clicks', function () {
        expect(element.isBlocked()).toBeFalsy();
        element.block();
        expect(element.isBlocked()).toBeTruthy();
        JHElement.fireOn(element.shadowRoot.querySelector('#close'), 'click');
        expect(element.isBlocked()).toBeFalsy();
    });
});
