
describe("store", function() {
	it("should exists", function() {
		expect(store).not.toBeUndefined();
		expect(typeof(store.dispatch)).toBe("function");
		expect(typeof(store.getState)).toBe("function");
	});

	it("should handle ACT_FOLDER_*", function() {
		expect(store.getState().folder).toBeFalsy();
		store.dispatch({ type: ACT_FOLDER_INVALIDATE });
		expect(store.getState().folder).toBeFalsy();

		store.dispatch({ type: ACT_FOLDER_STORE, payload: "blablabla" });
		expect(store.getState().folder).toBe("blablabla");

		store.dispatch({ type: ACT_FOLDER_INVALIDATE });
		expect(store.getState().folder).toBeFalsy();
	});
});
