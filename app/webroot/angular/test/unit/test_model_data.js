"use strict";

describe("Data", function() {
	var data = new cryptomedic.models.Data();
	it('should have inheritance ok', function() {
		expect(data instanceof cryptomedic.models.Data).toBeTruthy();
	});

	it('should have a getName function', function() {
		expect(data.getName()).toBeTruthy('Data');
	});
});
