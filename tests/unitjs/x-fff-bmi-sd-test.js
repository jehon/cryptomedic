
import { fn, loadReference } from './athelpers.js';

import Folder from '../../app/models/Folder.js';
import XFffBmiSd from '../../app/elements/widgets/x-fff-bmi-sd.js';

let testFolder;
const fuid = 'ricket-consult-13';

describe(fn(import.meta.url), function () {
    beforeEach(() => {
        testFolder = new Folder(loadReference('FolderTest.test1.json').folder);
        expect(testFolder.getByUid(fuid)).not.toBeNull();
    });

    describe('with folder', function () {
        /** @type {XFffBmiSd} */
        let el;
        beforeEach(() => {
            el = new XFffBmiSd();
            el.folder = testFolder;
        });

        it('shoud show', function() {
            el.fileUid = fuid;
            expect(el.innerText).toBe('2.4 ds');
        });
    });
});
