
import { setSession, deepCopy } from '../../app/js/session.js';
import { fn, webDescribe, loadReference } from './athelpers.js';

import '../../app/elements/widgets/x-restricted.js';

fdescribe(fn(import.meta.url), function () {
    let refSession;
    beforeEach(function () {
        refSession = loadReference('AuthTest.testsLogin.json');
        setSession(refSession);
    });

    webDescribe('without value', '<x-restricted ><div id="content">Content</div></x-restricted>', function (element) {
        it('should be hidden', function () {
            expect(element().querySelector('#content').offsetHeight).toBe(0);
        });

        it('should show on value change', function () {
            element().setAttribute('value', 'application.open');
            expect(element().querySelector('#content').offsetHeight).toBeGreaterThan(0);
        });
    });

    webDescribe('with value not authorized', '<x-restricted value="anything.forbidden"><div id="content">Content</div></x-restricted>', function (element) {
        it('should be hidden', function () {
            expect(element().querySelector('#content').offsetHeight).toBe(0);
        });

        it('should show on value change', function () {
            element().setAttribute('value', 'application.open');
            expect(element().querySelector('#content').offsetHeight).toBeGreaterThan(0);
        });

        it('should show when enabled by session', function () {
            const nsession = deepCopy(refSession);
            nsession.authorized.push('anything.forbidden');
            setSession(nsession);
            expect(element().querySelector('#content').offsetHeight).toBeGreaterThan(0);
        });
    });

    webDescribe('with value authorized', '<x-restricted value="application.open"><div id="content">Content</div></x-restricted>', function (element) {
        it('should be hidden', function () {
            expect(element().querySelector('#content').offsetHeight).toBeGreaterThan(0);
        });

        it('should hide on value change', function () {
            element().setAttribute('value', 'anything.else');
            expect(element().querySelector('#content').offsetHeight).toBe(0);
        });

        it('should hide when disabled by session', function () {
            const nsession = deepCopy(refSession);
            nsession.authorized = refSession.authorized.filter(v => v != 'application.open');
            setSession(nsession);
            expect(element().querySelector('#content').offsetHeight).toBe(0);
        });
    });
});
