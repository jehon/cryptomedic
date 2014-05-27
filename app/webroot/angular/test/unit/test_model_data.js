"use strict";

function myDeferredTest(setUp, results) {
	var done = false;
	runs(function() {
		setUp().done(function() { done = true; })
		.fail(function(data, msg) {
			console.error("Failed to load data in myDeferredTest");
			console.error(msg);
		});
	});
	waitsFor(function() { return done; }, "Waited too long inside myDeferredTest");
	runs(results);
}

describe("Data", function() {
	describe("with empty loader", function() {
		var data = new cryptomedic.models.Data();
		it('should have inheritance ok', function() {
			expect(data instanceof cryptomedic.models.Data).toBeTruthy();
			expect(data instanceof Class).toBeTruthy();
		});
	
		it('should have a load function', function() {
			expect(typeof(data.load)).toBe('function');
		});
	});
		
	describe("with data loading at construction time", function() {
		var folder = new cryptomedic.models.Folder({
			data1: "data1",
			dataArray: [ 1, 2, 3]
		});
		it("should contain all datas", function() {
			expect(folder.data1).toBe("data1");
			expect(folder.dataArray).toContain(1);
			expect(folder.dataArray).toContain(2);
			expect(folder.dataArray).toContain(3);
			expect(folder.dataArray).not.toContain(4);
			expect(folder.anything).toBeUndefined();
		});
	});

	describe("with data loading by function", function() {
		var folder = new cryptomedic.models.Folder();
		folder.load({
			data1: "data1",
			dataArray: [ 1, 2, 3]
		});
		it("should contain all datas", function() {
			expect(folder.data1).toBe("data1");
			expect(folder.dataArray).toContain(1);
			expect(folder.dataArray).toContain(2);
			expect(folder.dataArray).toContain(3);
			expect(folder.dataArray).not.toContain(4);
			expect(folder.anything).toBeUndefined();
		});
	});
	
	describe("with data loaded remotely", function() {
		it("should load correctly load_test.json and store it", function() {
			var folder = new cryptomedic.models.Folder();
			var done = false;
			runs(function() {
				folder.loadFrom("/base/test/mocks/load_test.json").done(function(data) {
					done = true;
				});
			});
			
			waitsFor(function() {
				return done; 
			}, "load_test.json should be loaded");
			
			runs(function() {
				expect(folder.data1).toBe("data1");
				expect(folder.dataArray).toContain(1);
				expect(folder.dataArray).toContain(2);
				expect(folder.dataArray).toContain(3);
				expect(folder.dataArray).not.toContain(4);
				expect(folder.anything).toBeUndefined();
			});
		});
	});
	
	describe("with data loaded remotely tested through myAsyncTest", function() {
		var folder = new cryptomedic.models.Folder();
		it("should load correctly load_test.json and store it", myDeferredTest(function () {
			return folder.loadFrom("/base/test/mocks/load_test.json");
		}, function() {
			expect(folder.data1).toBe("data1");
			expect(folder.dataArray).toContain(1);
			expect(folder.dataArray).toContain(2);
			expect(folder.dataArray).toContain(3);
			expect(folder.dataArray).not.toContain(4);
			expect(folder.anything).toBeUndefined();
		}));
	});
});
