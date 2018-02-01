
describe("store", function() {
	let f;
	beforeEach(() => {
    	f = new Folder(loadReference('FolderTest.test1.json').folder);
    });

	it("should exists", function() {
		expect(store).not.toBeUndefined();
		expect(typeof(store.dispatch)).toBe("function");
		expect(typeof(store.getState)).toBe("function");
	});

	it("should handle ACT_FOLDER_*", function() {
		expect(store.getState().folder).toBeFalsy();
		store.dispatch({ type: ACT_FOLDER_INVALIDATE });
		expect(store.getState().folder).toBeFalsy();

		spyOn(console, "error");
		store.dispatch({ type: ACT_FOLDER_STORE, payload: "blablabla" });
		expect(store.getState().folder).toBeFalsy();
		expect(console.error).toHaveBeenCalled();

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

	it("should handle ACT_USER_*", function() {
		const user = { username: "test" };

		expect(store.getState().user).toBeFalsy();
		store.dispatch({ type: ACT_USER_LOGOUT });
		expect(store.getState().user).toBeFalsy();
		expect(store.getState().folder).toBeFalsy();

		store.dispatch({ type: ACT_USER_LOGIN, payload: user });
		expect(store.getState().user).toBe(user);

		store.dispatch({ type: ACT_USER_LOGOUT });
		expect(store.getState().user).toBeFalsy();
	});
});
