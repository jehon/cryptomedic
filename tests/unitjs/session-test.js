
import { getSession, setSession, _resetSession, getUsername } from '../../app/js/session.js';

import { fn } from './athelpers.js';

describe(fn(import.meta.url), function () {
    it('should set and reset session', async function () {
        _resetSession();
        // The session is set before
        setSession(1);
        expect(await getSession()).toBe(1);
        expect(await getSession()).toBe(1);
        expect(await getSession()).toBe(1);
    });

    it('should set and then get the session', async function (done) {
        // The session is set after
        _resetSession();
        getSession().then(session => {
            expect(session).toBe(3);
            done();
        });
        setSession(3);
    });

    it('should not set twice', async function () {
        // The session is set after
        _resetSession();
        setSession(5);
        expect(() => setSession(10)).toThrowError();

        _resetSession();
        setSession(15);
        expect(await getSession()).toBe(15);
    });

    it('should give info', async function () {
        _resetSession();
        setSession({
            username: 'user'
        });
        expect(await getUsername()).toBe('user');
    });
});
