"use strict";

describe("Folder", function() {
	describe("with empty loader", function() {
		var folder = new cryptomedic.models.Folder();
		it('should have inheritance ok', function() {
			expect(folder instanceof cryptomedic.models.Folder).toBeTruthy();
			expect(folder instanceof cryptomedic.models.Data).toBeTruthy();
			expect(folder instanceof Class).toBeTruthy();
		});
	});

	describe("with mock_patient_10.json", function() {
		var folder = new cryptomedic.models.Folder();
		it("should load correctly and store it", function (done) {
			folder.loadFrom("/base/tests/js/mocks/mock_patient_10.json").done(function() {
				expect(folder instanceof cryptomedic.models.Folder).toBeTruthy();
				expect(folder instanceof cryptomedic.models.Folder).toBeTruthy();
				expect(folder.id).toBe(10);
				expect(folder.getId()).toBe(10);
				expect(folder.getSubFiles().length).toBe(7);
				expect(folder.getSubFile(9)).toBe(null);
				expect(folder.getMainFile() instanceof cryptomedic.models.Patient).toBeTruthy();
				expect(folder.getMainFile().id).toBe(10);
				done();
			});
		});
	});
});
