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
		var data = new cryptomedic.models.Data({
			data1: "data1",
			dataArray: [ 1, 2, 3]
		});
		it("should contain all datas", function() {
			expect(data.data1).toBe("data1");
			expect(data.dataArray).toContain(1);
			expect(data.dataArray).toContain(2);
			expect(data.dataArray).toContain(3);
			expect(data.dataArray).not.toContain(4);
			expect(data.anything).toBeUndefined();
		});
	});

	describe("with data loading by function", function() {
		var data = new cryptomedic.models.Data();
		data.load({
			data1: "data1",
			dataArray: [ 1, 2, 3]
		});
		it("should contain all datas", function() {
			expect(data.data1).toBe("data1");
			expect(data.dataArray).toContain(1);
			expect(data.dataArray).toContain(2);
			expect(data.dataArray).toContain(3);
			expect(data.dataArray).not.toContain(4);
			expect(data.anything).toBeUndefined();
		});
	});
	
	describe("with data loaded remotely", function() {
		it("should load correctly load_test.json and store it", function() {
			var data = new cryptomedic.models.Data();
			var done = false;
			runs(function() {
				data.loadFrom("/base/test/mocks/mock_load_test.json").done(function(data) {
					done = true;
				});
			});
			
			waitsFor(function() {
				return done; 
			}, "load_test.json should be loaded");
			
			runs(function() {
				expect(data.data1).toBe("data1");
				expect(data.dataArray).toContain(1);
				expect(data.dataArray).toContain(2);
				expect(data.dataArray).toContain(3);
				expect(data.dataArray).not.toContain(4);
				expect(data.anything).toBeUndefined();
			});
		});
	});
	
	describe("with data loaded remotely tested through myAsyncTest", function() {
		var data = new cryptomedic.models.Data();
		it("should load correctly load_test.json and store it", myDeferredTest(function () {
			return data.loadFrom("/base/test/mocks/mock_load_test.json");
		}, function() {
			expect(data.data1).toBe("data1");
			expect(data.dataArray).toContain(1);
			expect(data.dataArray).toContain(2);
			expect(data.dataArray).toContain(3);
			expect(data.dataArray).not.toContain(4);
			expect(data.anything).toBeUndefined();
		}));
	});

	describe("would interpret notSet correctly", function() {
		var data = new cryptomedic.models.Data();
		expect(data.data1).toBeUndefined();
		expect(data.isSet("data1")).toBeFalsy();
		expect(data.isNotZero("data1")).toBeFalsy();
		expect(data.data2).toBeUndefined();
		expect(data.isSet("data2")).toBeFalsy();
		expect(data.isNotZero("data2")).toBeFalsy();

		data.load({ 'data1': null });
		expect(data.data1).toBe(null);
		expect(data.isSet("data1")).toBeFalsy();
		expect(data.isNotZero("data1")).toBeFalsy();
		expect(data.data2).toBeUndefined();
		expect(data.isSet("data2")).toBeFalsy();
		expect(data.isNotZero("data2")).toBeFalsy();
		
		data.data2 = 0;
		expect(data.data1).toBe(null);
		expect(data.isSet("data1")).toBeFalsy();
		expect(data.isNotZero("data1")).toBeFalsy();
		expect(data.data2).toBe(0);
		expect(data.isSet("data2")).toBeTruthy();
		expect(data.isNotZero("data2")).toBeFalsy();
		
		data.data1 = 123;
		expect(data.data1).toBe(123);
		expect(data.isSet("data1")).toBeTruthy();
		expect(data.isNotZero("data1")).toBeTruthy();
		expect(data.data2).toBe(0);
		expect(data.isSet("data2")).toBeTruthy();
		expect(data.isNotZero("data2")).toBeFalsy();
	});
});
