
import store, {
    ACT_FOLDER_INVALIDATE,
    ACT_FOLDER_STORE,
    ACT_USER_LOGIN,
    ACT_USER_LOGOUT,
    ACT_DEFINITIONS_STORE
} from '../../app/js/store.js';
import { loadReference } from './athelpers.js';
import Folder from '../../app/models/Folder.js';

describe('store', function () {
    let f;
    beforeEach(() => {
        // TODO: real test is here (when folder is modularized):
        // f = new Folder(loadReference('FolderTest.test1.json').folder);
        f = new Folder(loadReference('FolderTest.test1.json').folder);
    });

    it('should exists', function () {
        expect(store).not.toBeUndefined();
        expect(typeof (store.dispatch)).toBe('function');
        expect(typeof (store.getState)).toBe('function');
    });

    it('should handle ACT_FOLDER_*', function () {
        store.dispatch({ type: ACT_FOLDER_INVALIDATE });
        expect(store.getState().folder).toBeFalsy();

        // TODO: real test is here (when folder is modularized)
        // spyOn(console, 'error');
        // store.dispatch({ type: ACT_FOLDER_STORE, payload: 'blablabla' });
        // expect(store.getState().folder).toBeFalsy();
        // expect(console.error).toHaveBeenCalled();

        store.dispatch({ type: ACT_FOLDER_STORE, payload: f });
        expect(store.getState().folder).toBe(f);

        // Empty case reduce to false
        store.dispatch({ type: ACT_FOLDER_STORE, payload: null });
        expect(store.getState().folder).toBe(false);

        // Empty case reduce to false
        store.dispatch({ type: ACT_FOLDER_STORE, payload: false });
        expect(store.getState().folder).toBe(false);

        // Empty case reduce to false
        store.dispatch({ type: ACT_FOLDER_STORE, payload: {} });
        expect(store.getState().folder).toBe(false);

        store.dispatch({ type: ACT_FOLDER_INVALIDATE });
        expect(store.getState().folder).toBeFalsy();
    });

    it('should handle ACT_USER_*', function () {
        const user = { username: 'test', prices: 123 };

        store.dispatch({ type: ACT_USER_LOGOUT });
        expect(store.getState().user).toBeFalsy();
        expect(store.getState().folder).toBeFalsy();
        expect(store.getState().definitions).toBeFalsy();

        store.dispatch({ type: ACT_USER_LOGIN, payload: user });
        expect(store.getState().user.username).toBe(user.username);
        expect(store.getState().definitions.prices).toBe(123);

        store.dispatch({ type: ACT_USER_LOGOUT });
        expect(store.getState().user).toBeFalsy();
    });

    it('should handle ACT_DEFINITIONS_*', function () {
        const defs = { prices: 123 };

        store.dispatch({ type: ACT_DEFINITIONS_STORE, payload: defs });
        expect(store.getState().definitions.prices).toBe(123);

        store.dispatch({ type: ACT_USER_LOGOUT });
        expect(store.getState().definitions).toBeFalsy();
    });
});
