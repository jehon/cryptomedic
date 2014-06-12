"use strict";

describe("File", function() {
	describe("with mock_patient_10.json", function() {
		var folder = new cryptomedic.models.Folder();
		it("should have correct properties", function(done) { //myDeferredTest(function () {
			// Go through the rest_service !!!
			folder.loadFrom("/base/test/mocks/mock_patient_10.json").done(function() {
				expect(folder instanceof cryptomedic.models.Folder).toBeTruthy();

//angular.forEach(folder.getSubFiles(), function (value, key) { console.log(key + ": " + value['type'] + "#" + value['id'])});

				expect(folder.getMainFile() instanceof cryptomedic.models.Patient).toBeTruthy();
				expect(folder.getMainFile().Sex).toBe(207);
				expect(folder.getMainFile().Yearofbirth).toBe(1998);
				expect(folder.getMainFile().actualAge(new Date("2014-01-01"))).toBe("16 years old today");

				var i = 6;
				expect(folder.getSubFile(i) instanceof cryptomedic.models.File).toBeTruthy();
				expect(folder.getSubFile(i) instanceof cryptomedic.models.ClubFoot).toBeTruthy();
				expect(folder.getSubFile(i).id).toBe(695);
				expect(folder.getSubFile(i).patient instanceof cryptomedic.models.Patient).toBeTruthy();
				expect(folder.getSubFile(i).Date).toBe("2014-04-17");
				expect(folder.getSubFile(i).ageAtConsultTime()).toBe(16);
				
				i = 8;
				expect(folder.getSubFile(i) instanceof cryptomedic.models.File).toBeTruthy();
				expect(folder.getSubFile(i) instanceof cryptomedic.models.OrthopedicDevice).toBeTruthy();
				expect(folder.getSubFile(i).id).toBe(17);
				expect(folder.getSubFile(i).patient instanceof cryptomedic.models.Patient).toBeTruthy();
				expect(folder.getSubFile(i).Date).toBe("0000-00-00");
				expect(folder.getSubFile(i).ageAtConsultTime).toThrow();
				//expect(folder.getSubFile(i).ageAtConsultTime).toThrow(new DataMissingException("Date"));
				done();
			});
		});
	});
});
