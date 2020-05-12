
import * as router from '../../app/js/router.js';

import { fn } from './athelpers.js';

describe(fn(import.meta.url), function () {
    it('should parse login routes', function () {
        {
            const r = router.getCurrentRoute();
            router.routeToLogin();
            expect(router.parseRouteLogin().redirect).toBe(r);
        }

        {
            const r = "/home";
            router.routeToLogin(r);
            expect(router.parseRouteLogin().redirect).toBe(r);
        }

        {
            const r = "/home/test/123";
            router.routeToLogin(r);
            expect(router.parseRouteLogin().redirect).toBe(r);
        }
    });

    it('should route to logout', function () {
        router.routeToLogout('test');
    })
});
