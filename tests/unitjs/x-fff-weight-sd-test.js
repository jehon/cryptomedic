
import { fn, loadReference } from './athelpers.js';

import Folder from '../../app/models/Folder.js';
import XFffWeightSd from '../../app/elements/widgets/x-fff-weight-sd.js';

let testFolder;
const fuid = 'ricket-consult-13';

describe(fn(import.meta.url), function () {
    beforeEach(() => {
        testFolder = new Folder(loadReference('FolderTest.test1.json').folder);
        expect(testFolder.getByUid(fuid)).not.toBeNull();
    });

    describe('with folder', function () {
        /** @type {XFffWeightSd} */
        let el;
        beforeEach(() => {
            el = new XFffWeightSd();
            el.folder = testFolder;
        });

        it('shoud show', function () {
            el.file = testFolder.getByUid(fuid);
            expect(el.innerText).toBe('-3.6 ds');
        });
    });
});
