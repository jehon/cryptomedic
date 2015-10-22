"use strict";

describe("Data", function() {
	describe("with empty loader", function() {
		var data = new application.models.Data();
		it('should have inheritance ok', function() {
			expect(data instanceof application.models.Data).toBeTruthy();
			expect(data instanceof Class).toBeTruthy();
		});

		it('should have a load function', function() {
			expect(typeof(data.load)).toBe('function');
		});
	});

	describe("with data loading at construction time", function() {
		var data = new application.models.Data({
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
		var data = new application.models.Data();
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
		it("should load correctly load_test.json and store it", function(done) {
			var data = new application.models.Data();
			data.loadFrom("/base/test/mocks/mock_load_test.json").done(function(data) {
				expect(data.data1).toBe("data1");
				expect(data.dataArray).toContain(1);
				expect(data.dataArray).toContain(2);
				expect(data.dataArray).toContain(3);
				expect(data.dataArray).not.toContain(4);
				expect(data.anything).toBeUndefined();
				done();
			});
		});
	});

	describe("with data loaded remotely tested through myAsyncTest", function() {
		var data = new application.models.Data();
		it("should load correctly load_test.json and store it", function(done) {
			data.loadFrom("/base/test/mocks/mock_load_test.json").done(function() {
				expect(data.data1).toBe("data1");
				expect(data.dataArray).toContain(1);
				expect(data.dataArray).toContain(2);
				expect(data.dataArray).toContain(3);
				expect(data.dataArray).not.toContain(4);
				expect(data.anything).toBeUndefined();
				done();
			});
		});
	});

	it("would interpret notSet correctly", function() {
		var data = new application.models.Data();
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
