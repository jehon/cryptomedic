
import * as router from '../../app/js/router.js';

import { fn, RefFolder1 } from './athelpers.js';

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

    describe('folder routes', function () {
        let f;
        beforeEach(() => {
            f = new Folder(loadReference(RefFolder1).folder);
            expect(f).toEqual(jasmine.any(Folder));
        });

        it('should route to file', function () {
            let fp = f.getByTypeAndId(OtherConsult, 1);
            expect(router.getRouteToFolderFile(fp)).toBe('/folder/1/file/OtherConsult/1');
        });

        it('should route to create reference', function () {
            expect(router.getRouteToCreateReference()).toBe('/folder/-1/edit');
        });

        it('should route to add file', function () {
            expect(router.getRouteToFolderAdd(1, 'Type')).toBe('/folder/1/file/Type');
        });
    });
});
