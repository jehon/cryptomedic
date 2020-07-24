
import { fn, loadReference, refFolder1 } from './athelpers.js';

import Folder from '../../app/models/Folder.js';
import XFffBmi from '../../app/elements/widgets/x-fff-bmi.js';

let testFolder;
const fuid = 'ricket-consult-13';

describe(fn(import.meta.url), function () {
    beforeEach(() => {
        testFolder = new Folder(loadReference(refFolder1).folder);
        expect(testFolder.getByUid(fuid)).not.toBeNull();
    });

    describe('with folder', function () {
        /** @type {XFffBmi} */
        let el;
        beforeEach(() => {
            el = new XFffBmi();
            el.folder = testFolder;
        });

        it('shoud show', function () {
            el.file = testFolder.getByUid(fuid);
            expect(el.innerText).toBe('30.6');
        });
    });
});
