"use strict";

describe("Folder", function() {
	var folder = new cryptomedic.models.Folder();
	it('should have inheritance ok', function() {
		expect(folder instanceof cryptomedic.models.Folder).toBeTruthy();
		expect(folder instanceof cryptomedic.models.Data).toBeTruthy();
	});
	it('should have a getName function', function() {
		expect(folder.getName()).toBeTruthy('Data');
	});
});
