
import { fn, loadReference, RefFolder1, RefFolder1RicketConsult13 } from './athelpers.js';

import Folder from '../../app/models/Folder.js';
import XFffWh from '../../app/elements/widgets/x-fff-wh.js';

let testFolder;

describe(fn(import.meta.url), function () {
    beforeEach(() => {
        testFolder = new Folder(loadReference(RefFolder1).folder);
        expect(testFolder.getByUid(RefFolder1RicketConsult13)).not.toBeNull();
    });

    describe('with folder', function () {
        /** @type {XFffWh} */
        let el;
        beforeEach(() => {
            el = new XFffWh();
            el.folder = testFolder;
        });

        it('shoud show', function () {
            el.file = testFolder.getByUid(RefFolder1RicketConsult13);
            expect(el.innerText).toBe('0.34');
        });
    });
});
