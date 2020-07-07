
import WithMixin, { WithMixinFolder, WithMixinFileUid } from '../../app/elements/mixins/with-mixin.js';

import { fn } from './athelpers.js';

/**
 * @augments {HTMLElement}
 */
export class XXWithMixinFolder extends WithMixinFolder(HTMLElement) {
    onFolderChanged(v) {
        this.v_folder = v;
    }
}
window.customElements.define('xx-with-mixin-folder-test', XXWithMixinFolder);

export class XXWithMixinFileUid extends WithMixinFileUid(HTMLElement) {
    onFileUidChanged(v) {
        this.v_uid = v;
    }
}
window.customElements.define('xx-with-mixin-file-uid-test', XXWithMixinFileUid);

describe(fn(import.meta.url), function () {
    describe('with folder', function () {
        withHtml('<xx-with-mixin-folder-test></xx-with-mixin-folder-test>', function (element) {
            it('should not have a default value', function () {
                expect(element().folder).toBeUndefined();
                expect(element().hasAttribute('with-folder')).toBeTrue();
            });

            it('should define when set', function () {
                element().folder = 123;
                expect(element().folder).toBe(123);
            });

            it('should fire when set', function () {
                let ok = false;
                element().onFolderChanged = function (v) { ok = v; };
                element().folder = 123;
                expect(element().folder).toBe(123);
                expect(ok).toBe(123);
            });
        });
    })

    describe('with file-uid and folder', function () {
        withHtml('<xx-with-mixin-file-uid-test></xx-with-file-uid-test>', function (element) {
            it('should not have a default value', function () {
                expect(element().fileUid).toBeUndefined();
                expect(element().hasAttribute('with-file-uid')).toBeTrue();

                expect(element().folder).toBeUndefined();
                expect(element().hasAttribute('with-folder')).toBeTrue();
            });

            it('should define when set', function () {
                element().fileUid = 123;
                expect(element().fileUid).toBe(123);

                element().folder = 123;
                expect(element().folder).toBe(123);
            });

            it('should fire when set', function () {
                let okf = false;
                let oku = false;

                element().onFolderChanged = function (v) { okf = v; };
                element().onFileUidChanged = function (v) { oku = v; };

                element().folder = 123;
                expect(element().folder).toBe(123);
                expect(okf).toBe(123);

                element().fileUid = 123;
                expect(element().fileUid).toBe(123);
                expect(oku).toBe(123);
            });
        });
    });

});