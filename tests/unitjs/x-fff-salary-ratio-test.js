
import { fn, loadReference, RefFolder1 } from './athelpers.js';

import Folder from '../../app/models/Folder.js';
import XFffSalaryRatio from '../../app/widgets/file/x-fff-salary-ratio.js';

let testFolder;
const fuid = 'bill-1';

describe(fn(import.meta.url), function () {
    beforeEach(() => {
        testFolder = new Folder(loadReference(RefFolder1).folder);
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
