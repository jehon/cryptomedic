
import { fn, loadReference, RefFolder1, RefFolder1RicketConsult13 } from './athelpers.js';

import Folder from '../../app/models/Folder.js';
import XFffField from '../../app/elements/widgets/file/x-fff-field.js';

let f;

describe(fn(import.meta.url), function () {
    beforeEach(() => {
        f = new Folder(loadReference(RefFolder1).folder);
    });

    describe('without folder', function () {
        let el;
        beforeEach(() => {
            el = new XFffField();
        });

        it('shoud show', function () {
            expect(el.shadowRoot.querySelector('#label').innerHTML).toBe('');
        });

        it('shoud set label', function () {
            el.setAttribute('label', 'hello there');
            expect(el.shadowRoot.querySelector('#label').innerHTML).toBe('hello there');
        });

        it('shoud set field', function () {
            el.setAttribute('field', 'helloThere');
            expect(el.shadowRoot.querySelector('#label').innerHTML).toBe('Hello there');
        });
    });

    describe('with folder', function () {
        let el;
        beforeEach(() => {
            el = new XFffField();
            el.folder = f;
            el.file = f.getByUid(RefFolder1RicketConsult13);
        });

        it('shoud show', function () {
            expect(el.shadowRoot.querySelector('#label').innerHTML).toBe('');
        });

        it('shoud set label', function () {
            el.setAttribute('label', 'hello there');
            expect(el.shadowRoot.querySelector('#label').innerHTML).toBe('hello there');
        });

        it('shoud set field', function () {
            el.setAttribute('field', 'helloThere');
            expect(el.shadowRoot.querySelector('#label').innerHTML).toBe('Hello there');
            expect(el.hasAttribute('empty')).toBeTrue();

            el.setAttribute('field', 'ExaminerName');
            expect(el.shadowRoot.querySelector('#label').innerHTML).toBe('Examiner name');
            expect(el.hasAttribute('empty')).toBeFalse();

            el.setAttribute('field', 'CrossRightT');
            expect(el.hasAttribute('empty')).toBeTrue();
        });

        it('shoud set sides', function () {
            el.setAttribute('by-sides', 'helloThere');
            expect(el.shadowRoot.querySelector('#label').innerHTML).toBe('Hello there');
            expect(el.hasAttribute('empty')).toBeTrue();

            el.setAttribute('by-sides', '*legAngle');
            expect(el.shadowRoot.querySelector('#label').innerHTML).toBe('Leg angle');
            expect(el.hasAttribute('empty')).toBeFalse();

            el.setAttribute('by-sides', 'ExaminerName');
            expect(el.shadowRoot.querySelector('#label').innerHTML).toBe('Examiner name');
            expect(el.hasAttribute('empty')).toBeTrue();
        });
    });
});
