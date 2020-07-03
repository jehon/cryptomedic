
import WithMixin from '../../app/elements/mixins/with-mixin.js';

import { fn } from './athelpers.js';

/**
 * @augments {HTMLElement}
 */
export default class XXWithMixinTest extends WithMixin('test', HTMLElement) {
    onTestChanged(v) {
        this.v = v;
    }
}

window.customElements.define('xx-with-mixin-test', XXWithMixinTest);

describe(fn(import.meta.url), function () {
    withHtml('<xx-with-mixin-test></xx-with-mixin-test>', function (element) {
        it('should not have a default value', function () {
            expect(element().test).toBeUndefined();
            expect(element().hasAttribute('with-test')).toBeTrue();
        });

        it('should define when set', function () {
            element().test = 123;
            expect(element().test).toBe(123);
        });

        it('should fire when set', function () {
            let ok = false;
            element().onTestChanged = function (v) { ok = v; };
            element().test = 123;
            expect(element().test).toBe(123);
            expect(ok).toBe(123);
        });
    });
});
