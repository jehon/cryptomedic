
describe("tests/unit/x-waiting-folder-test.js", function() {
	webDescribe("initialized", `<x-waiting-folder></x-waiting-folder>`, function(element) {
		const f = { a: 123 };

		it("should be blocked when initialized", function() {
			expect(element().isBlocked()).toBeTruthy();
		});

		it("should free when folder is set", function() {
			element().folder = f;
			expect(element().folder).toBe(f);
			expect(element().isBlocked()).toBeFalsy();
		});

		it("should free when folder is set and call adapt", function() {
		    spyOn(element(), 'adapt');
			element().folder = f;
			expect(element().folder).toBe(f);
			expect(element().isBlocked()).toBeFalsy();
    		expect(element().adapt).toHaveBeenCalled();
		});

		it("should free when folder is set and not call adapt if not initialized", function() {
		    spyOn(element(), 'adapt');
	        spyOn(element(), 'isInitialized').and.returnValue(false);
			element().folder = f;
			expect(element().folder).toBe(f);
			expect(element().isBlocked()).toBeFalsy();
    		expect(element().adapt).not.toHaveBeenCalled();
		});

		it("should block when folder is null", function() {
		    spyOn(element(), 'adapt');
			element().folder = null;
			expect(element().folder).toBeFalsy();
			expect(element().isBlocked()).toBeTruthy();
    		expect(element().adapt).not.toHaveBeenCalled();
		});

		describe("should react to store change", function() {
			it("should react to store ACT_FOLDER_INVALIDATE", function() {
				store.dispatch({ type: ACT_FOLDER_INVALIDATE });
				expect(element().folder).toBeFalsy();
				expect(element().isBlocked()).toBeTruthy();
			});

			it("should react to store ACT_FOLDER_STORE", function() {
				store.dispatch({ type: ACT_FOLDER_STORE, payload: f });
				expect(element().folder).toBe(f);
				expect(element().isBlocked()).toBeFalsy();
			});
		});
	});
});
