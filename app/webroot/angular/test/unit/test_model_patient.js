"use strict";

describe("Patient", function() {
	describe("with mock_patient_10.json", function() {
		var folder = new cryptomedic.models.Folder();
		it("should have correct properties", function (done) {
			folder.loadFrom("/base/test/mocks/mock_patient_10.json").done(function() {
				expect(folder instanceof cryptomedic.models.Folder).toBeTruthy();
				expect(folder.getMainFile() instanceof cryptomedic.models.Patient).toBeTruthy();
				expect(folder.getMainFile().id).toBe(10);
				expect(folder.getMainFile().Yearofbirth).toBe(1998);
				expect(folder.getMainFile().actualAge(new Date("2014-01-01"))).toBe(16);
				// expect(folder.getMainFile().actualAge()).toMatch("years old today");
				expect(folder.getMainFile().Sex).toBe(207);
				expect(folder.getMainFile().sexStr()).toBe("m");
				done();
			});
		});
	});
	it("should handle empty patient correctly", function() {
		expect((new cryptomedic.models.Patient()).actualAge).toThrow();
		expect(function() { (new cryptomedic.models.Patient()).actualAge(); }).toThrow(new DataMissingException("Yearofbirth"));
		expect((new cryptomedic.models.Patient()).sexStr()).toBe(null);
	});
	it("should handle very old patients", function() {
		var p = new cryptomedic.models.Patient();
		p.Yearofbirth = 1800;
//		expect(function() { p.actualAge(); }).toThrow();
		expect(function() { p.actualAge(); }).toThrow(new DataMissingException("Yearofbirth"));
	});
	it("should handle girls patients", function() {
		var p = new cryptomedic.models.Patient();
		p.Sex = 208;
		expect(p.sexStr()).toEqual("f");
	});
});
