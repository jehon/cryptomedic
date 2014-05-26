"use strict";

describe("Data", function() {
	describe("with empty loader", function() {
		var data = new cryptomedic.models.Data();
		it('should have inheritance ok', function() {
			expect(data instanceof cryptomedic.models.Data).toBeTruthy();
		});
	
		it('should have a getName function', function() {
			expect(data.getName()).toBeTruthy('Data');
		});
	});
		
	describe("with data loading", function() {
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
			expect(folder.anything).toBe(undefined);
		});
	});
});
