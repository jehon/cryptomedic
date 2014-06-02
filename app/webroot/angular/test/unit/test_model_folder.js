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
			folder.loadFrom("/base/test/mocks/mock_patient_10.json").done(function() {
				expect(folder instanceof cryptomedic.models.Folder).toBeTruthy();
				expect(typeof(folder.objectizeList)).toBe("function");
				folder.objectizeList();
				expect(folder instanceof cryptomedic.models.Folder).toBeTruthy();
				expect(folder.getPatient() instanceof cryptomedic.models.Patient).toBeTruthy();
				expect(folder.getPatient().id).toBe(10);
				done();
				// console.log(folder.files);
			});
		});
	});
});
