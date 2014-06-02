"use strict";

describe("Patient", function() {
	describe("with mock_patient_10.json", function() {
		var folder = new cryptomedic.models.Folder();
		it("should have correct properties", function (done) {
			folder.loadFrom("/base/test/mocks/mock_patient_10.json").done(function() {
				expect(folder instanceof cryptomedic.models.Folder).toBeTruthy();
				folder.objectizeList();
				expect(folder.getPatient() instanceof cryptomedic.models.Patient).toBeTruthy();
				expect(folder.getPatient().id).toBe(10);
				expect(folder.getPatient().Yearofbirth).toBe(1998);
				expect(folder.getPatient().actualAge(new Date("2014-01-01"))).toBe("16 years old today");
				expect(folder.getPatient().Sex).toBe(207);
				expect(folder.getPatient().sexStr()).toBe("m");
				done();
			});
		});
	});
});
