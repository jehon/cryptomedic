
import XWaiting from '../../app/elements/render/x-waiting.js';
import { createElementWithObject, createElementWithTag } from '../../app/js/custom-element.js';

import { fn } from './athelpers.js';

describe(fn(import.meta.url), function () {
    let element;

    beforeEach(() => {
        element = createElementWithObject(XWaiting, {}, [
            createElementWithTag('div', {}, 'Content')
        ]);
    });

    it('should be hidden when initialized simply', function () {
        expect(element.isBlocked()).toBeFalsy();
    });

    it('should show()', function () {
        element.block();

        expect(element.isBlocked()).toBeTruthy();
    });

    it('should hide()', function () {
        element.free();

        expect(element.isBlocked()).toBeFalsy();
        expect(element.hasAttribute('blocked')).toBeFalsy();
    });

    describe('run around a promise', function () {
        beforeEach(function () {
            jasmine.clock().install();
        });

        afterEach(function () {
            jasmine.clock().uninstall();
        });

        it('should be shown and hidden when the promise succeed', function (done) {
            let p = new Promise(function (resolve) {
                setTimeout(() => resolve(), 100);
            });

            expect(element.isBlocked()).toBeFalsy();
            let p2 = element.aroundPromise(p);

            expect(element.isBlocked()).toBeTruthy();
            jasmine.clock().tick(150);
            p2.then(() => {
                expect(element.isBlocked()).toBeFalsy();
                done();
            }).catch(done.fail);
        });

        it('should be shown and hidden if the promise fail', function (done) {
            let p = new Promise(function (resolve, reject) {
                setTimeout(() => reject(new Error()), 100);
            });

            expect(element.isBlocked()).toBeFalsy();
            let p2 = element.aroundPromise(p);

            expect(element.isBlocked()).toBeTruthy();
            jasmine.clock().tick(150);
            p2.catch(() => {
                expect(element.isBlocked()).toBeFalsy();
                done();
            });
        });
    });
});
