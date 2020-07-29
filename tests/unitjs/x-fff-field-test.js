
import { fn, loadReference, RefFolder1, RefFolder1RicketConsult13 } from './athelpers.js';

import Folder from '../../app/models/Folder.js';
import XFffField from '../../app/elements/widgets/x-fff-field.js';

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
});
