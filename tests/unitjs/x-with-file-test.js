
import { fn, loadReference } from './athelpers.js';

import XWithFile from '../../app/elements/abstract/x-with-file.js';
import Folder from '../../app/models/Folder.js';

let testFolder;
let fuid;

describe(fn(import.meta.url), function () {
    beforeEach(() => {
        testFolder = new Folder(loadReference('FolderTest.test1.json').folder);
        fuid = testFolder.list[0].uid();
    });

    describe('with folder', function () {
        let el;
        beforeEach(() => {
            el = new XWithFile();
            el.folder = testFolder;
        });

        it('should not have a default value', function () {
            expect(el.fileUid).toBeNull();
            expect(el.hasAttribute('with-folder')).toBeTrue();
            expect(el.hasAttribute('with-file-uid')).toBeTrue();
        });

        it('should define when set', function () {
            el.folder = testFolder;
            expect(el.folder.id).toBe(testFolder.id);

            el.fileUid = fuid;
            expect(el.fileUid).toBe(fuid);

            expect(el.file.uid()).toBe(fuid);
        });

        it('should not fire when null', function () {
            let ok = false;
            el.adapt = function () { ok = true; };

            el.fileUid = null;
            expect(el.fileUid).toBe(null);
            expect(el.getAttribute('with-file-uid')).toBe('null');
            expect(el.hasAttribute('blocked')).toBeTrue();
            expect(ok).toBeFalse();
        });

        it('should fire when set', function () {
            let ok = false;
            el.adapt = function () { ok = true; };

            el.fileUid = fuid;
            expect(el.folder.getId()).toBe(testFolder.getId());
            expect(el.file.id).toBe(testFolder.list[0].id);
            expect(el.getAttribute('with-folder')).toBe('' + testFolder.getId());
            expect(el.getAttribute('with-file-uid')).toBe('' + testFolder.list[0].uid());
            expect(el.hasAttribute('blocked')).toBeFalse();
            expect(ok).toBeTrue();
        });
    });
});
