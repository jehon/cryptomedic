"use strict";

describe("File", function() {
	describe("with mock_patient_10.json", function() {
		var folder = new cryptomedic.models.Folder();
		it("should have correct properties", function(done) { //myDeferredTest(function () {
			folder.loadFrom("/base/test/mocks/mock_patient_10.json").done(function() {
				expect(folder instanceof cryptomedic.models.Folder).toBeTruthy();
				folder.objectizeList();
//				angular.forEach(folder.files, function(f, i) { console.info(i + ": " + f.type + "/" + f.id); });
				
				expect(folder.getPatient() instanceof cryptomedic.models.Patient).toBeTruthy();
				expect(folder.getPatient().Sex).toBe(207);
				expect(folder.getPatient().Yearofbirth).toBe(1998);
				expect(folder.getPatient().actualAge(new Date("2014-01-01"))).toBe("16 years old today");
	
				var i = 7;
				expect(folder.file(i) instanceof cryptomedic.models.File).toBeTruthy();
				expect(folder.file(i) instanceof cryptomedic.models.ClubFoot).toBeTruthy();
				expect(folder.file(i).id).toBe(695);
				expect(folder.file(i).patient instanceof cryptomedic.models.Patient).toBeTruthy();
				expect(folder.file(i).Date).toBe("2014-04-17");
				expect(folder.file(i).ageAtConsultTime()).toBe(16);
				
				i = 9;
				expect(folder.file(i) instanceof cryptomedic.models.File).toBeTruthy();
				expect(folder.file(i) instanceof cryptomedic.models.OrthopedicDevice).toBeTruthy();
				expect(folder.file(i).id).toBe(17);
				expect(folder.file(i).patient instanceof cryptomedic.models.Patient).toBeTruthy();
				expect(folder.file(i).Date).toBe(null);
				expect(folder.file(i).ageAtConsultTime).toThrow();
				//expect(folder.file(i).ageAtConsultTime).toThrow(new DataMissingException("Date"));
				done();
			});
		});
	});
});
