
import * as router from '../../app/js/router.js';

import { fn } from './athelpers.js';
import { API_VERSION } from '../../app/config.js';

describe(fn(import.meta.url), function () {
    it('should parse login routes', function () {
        {
            router.setRoute('/test')
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

        {
            router.setRoute("/login/login/test");
            expect(router.parseRouteLogin().redirect).toBe("/test");
        }
    });

    it('should route to login', function () {
        router.routeToLogin('test');
        expect(router.getCurrentRoute()).toBe('/login/test');
    });

    it('should parse route to api', function () {
        router.setRoute('/redirect/api/brol/test?1=2');
        expect(router.parseRouteApi().redirect).toBe(`/api/${API_VERSION}/brol/test?1=2`);
    });
});
