
import * as router from '../../app/js/router.js';

import { fn } from './athelpers.js';
import { API_VERSION } from '../../app/config.js';

import Folder from '../../app/models/Folder.js';
import { loadReference } from './athelpers.js';
import OtherConsult from '../../app/models/OtherConsult.js';

describe(fn(import.meta.url), function () {
    it('should parse login routes', function () {
        {
            router.setRoute('/test');
            const r = router.getCurrentRoute();
            router.routeToLogin();
            expect(router.parseRouteLogin().redirect).toBe(r);
        }

        {
            const r = '/home';
            router.routeToLogin(r);
            expect(router.parseRouteLogin().redirect).toBe(r);
        }

        {
            const r = '/home/test/123';
            router.routeToLogin(r);
            expect(router.parseRouteLogin().redirect).toBe(r);
        }

        {
            router.setRoute('/login/login/test');
            expect(router.parseRouteLogin().redirect).toBe('/test');
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

    describe('folder routes', function () {
        let f;
        beforeEach(() => {
            f = new Folder(loadReference('FolderTest.test1.json').folder);
            expect(f).toEqual(jasmine.any(Folder));
        });

        it('should route to file', function () {
            let fp = f.getByTypeAndId(OtherConsult, 1);
            expect(router.getRouteToFolderFile(fp)).toBe('/folder/1/file/OtherConsult/1');
        });
    });
});
