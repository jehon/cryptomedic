
import { fn, loadReference } from './athelpers.js';

import XWithFolder from '../../app/elements/abstract/x-with-folder.js';
import Folder from '../../app/models/Folder.js';
import { ApplicationException } from '../../app/js/exceptions.js';

let testFolder;

describe(fn(import.meta.url), function () {
    beforeEach(() => {
        testFolder = new Folder(loadReference('FolderTest.test1.json').folder);
    });

    describe('with folder', function () {
        let el;
        beforeEach(() => {
            el = new XWithFolder();
        });

        it('should not have a default value', function () {
            expect(el.folder).toBeNull();
            expect(el.hasAttribute('with-folder')).toBeTrue();
        });

        it('should define when set', function () {
            el.folder = testFolder;
            expect(el.folder.id).toBe(testFolder.id);
        });

        it('should not fire when null', function () {
            let ok = false;
            el.adapt = function () { ok = true; };

            el.folder = null;
            expect(el.folder).toBe(null);
            expect(el.getAttribute('with-folder')).toBe('null');
            expect(el.hasAttribute('blocked')).toBeTrue();
            expect(ok).toBeFalse();
        });

        it('should fire when set', function () {
            let ok = false;
            el.adapt = function () { ok = true; };

            el.folder = testFolder;
            expect(el.folder.id).toBe(testFolder.id);
            expect(el.getAttribute('with-folder')).toBe('' + testFolder.getId());
            expect(el.hasAttribute('blocked')).toBeFalse();
            expect(ok).toBeTrue();
        });

        it('should render the function', function() {
            el.folder = testFolder;

            expect(el.innerText).toBe('ok');
            expect(el.hasAttribute('error')).toBeFalse();

            el.formula = function () { throw 'blabla'; };
            el.adapt();
            expect(el.innerText).toBe('blabla');
            expect(el.hasAttribute('error')).toBeTrue();

            el.formula = function () { throw new ApplicationException('appError'); };
            el.adapt();
            expect(el.innerText).toBe('appError');
            expect(el.hasAttribute('error')).toBeTrue();
        });
    });
});
