
import { fn, loadReference } from './athelpers.js';

import Folder from '../../app/models/Folder.js';
import XFffHeightSd from '../../app/elements/widgets/x-fff-height-sd.js';

let testFolder;
const fuid = 'ricket-consult-13';

describe(fn(import.meta.url), function () {
    beforeEach(() => {
        testFolder = new Folder(loadReference('FolderTest.test1.json').folder);
        expect(testFolder.getByUid(fuid)).not.toBeNull();
    });

    describe('with folder', function () {
        /** @type {XFffHeightSd} */
        let el;
        beforeEach(() => {
            el = new XFffHeightSd();
            el.folder = testFolder;
        });

        it('shoud show', function () {
            el.file = testFolder.getByUid(fuid);
            expect(el.innerText).toBe('-9.6 ds');
        });
    });
});
