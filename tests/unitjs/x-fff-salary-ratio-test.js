
import { fn, loadReference } from './athelpers.js';

import Folder from '../../app/models/Folder.js';
import XFffSalaryRatio from '../../app/elements/widgets/x-fff-salary-ratio.js';

let testFolder;
const fuid = 'bill-1';

describe(fn(import.meta.url), function () {
    beforeEach(() => {
        testFolder = new Folder(loadReference('FolderTest.test1.json').folder);
        expect(testFolder.getByUid(fuid)).not.toBeNull();
    });

    describe('with folder', function () {
        /** @type {XFffSalaryRatio} */
        let el;
        beforeEach(() => {
            el = new XFffSalaryRatio();
            el.folder = testFolder;
        });

        it('shoud show', function () {
            el.file = testFolder.getByUid(fuid);
            expect(el.innerText).toBe('429');
        });
    });
});
