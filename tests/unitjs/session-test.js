
import {
    setSession, onSession, getSession,
    onUsername, getUsername
} from '../../app/js/session.js';

import { fn, loadReference } from './athelpers.js';

describe(fn(import.meta.url), function () {
    let refSession;
    beforeEach(function () {
        refSession = loadReference('AuthTest.testsLogin.json');
    });

    describe('without session', function () {
        beforeEach(function () {
            setSession();
        })

        it('is empty on start', async function (done) {
            const unreg = onSession(data => {
                expect(data).toBeNull();
                expect(getSession()).toBeNull();
                done();
            });
            // cb is called by 'get' value, thus before sending back the unreg
            // so we need to call unreg here
            unreg();
        });


        it('should set session', async function (done) {
            const unreg = onSession(data => {
                if (!data) return;
                expect(data.group).toBe("cdc");
                expect(getSession().group).toBe("cdc");
                done();
            });
            setSession(refSession);
            unreg();
        });

        it('with username', function () {
            expect(getUsername()).toBeUndefined();
        })
    });

    describe('with session', function () {
        beforeEach(function () {
            setSession(refSession);
        });

        it('with memorized value', async function (done) {
            expect(getSession().group).toBe("cdc");
            const unreg = onSession(data => {
                expect(data.group).toBe("cdc");
                done();
            });
            unreg();
        });

        it('with username', async function (done) {
            expect(getUsername()).toBe("murshed");
            const unreg = onUsername(data => {
                expect(data).toBe("murshed");
                done();
            });
            unreg();
        });
    });
});
