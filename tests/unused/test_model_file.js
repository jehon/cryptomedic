"use strict";

describe("File", function() {
	var ricketConsult_8819 = 2;
	var clubFoot_695 = 5;

	describe("with mock_patient_10.json", function() {
		var folder = new application.models.Folder();
		it("should have correct properties", function(done) {
			// Go through the rest_service !!!
			folder.loadFrom("/base/tests/js/mocks/mock_patient_10.json").done(function() {
				expect(folder instanceof application.models.Folder).toBeTruthy();

				expect(folder.getMainFile() instanceof application.models.Patient).toBeTruthy();
				expect(folder.getMainFile().Sex).toBe(207);
				expect(folder.getMainFile().Yearofbirth).toBe(1998);
				expect(folder.getMainFile().actualAge(new Date("2014-01-01"))).toBe(16);

angular.forEach(folder.getSubFiles(), function(val, i) { console.log(i + ": " + val._type + "#" + val.id) });

				var i;
				i = ricketConsult_8819;
				expect(folder.getSubFile(i) instanceof application.models.File).toBeTruthy();
				expect(folder.getSubFile(i) instanceof application.models.RicketConsult).toBeTruthy();
				expect(folder.getSubFile(i).id).toBe(8819);
				expect(folder.getSubFile(i).getPatient() instanceof application.models.Patient).toBeTruthy();
				expect(folder.getSubFile(i).Date).toEqual(new Date(2014, 5, 4));
				expect(folder.getSubFile(i).ageAtConsultTime()).toBe(16);

				i = clubFoot_695;
				expect(folder.getSubFile(i) instanceof application.models.File).toBeTruthy();
				expect(folder.getSubFile(i) instanceof application.models.ClubFoot).toBeTruthy();
				expect(folder.getSubFile(i).id).toBe(695);
				expect(folder.getSubFile(i).getPatient() instanceof application.models.Patient).toBeTruthy();
				expect(folder.getSubFile(i).Date).toEqual(new Date(2014, 3, 17));
				expect(folder.getSubFile(i).ageAtConsultTime()).toBe(16);

				done();
			});
		});
		describe("with empty object", function() {
			it("should throw error everytime", function(done) {
				var i = ricketConsult_8819;
				var o = new application.models.File({}, new application.models.Patient());

				expect(function() { o.ageAtConsultTime(); }).toThrow(new DataMissingException("Date"));
				expect(function() { o.bmi(); }).toThrow(new DataMissingException("Height"));
				expect(function() { o.wh(); }).toThrow(new DataMissingException("Height"));
				expect(function() { o.ds_height(); }).toThrow(new DataMissingException("sex"));
				expect(function() { o.ds_weight(); }).toThrow(new DataMissingException("sex"));
				expect(function() { o.ds_weight_height(); }).toThrow(new DataMissingException("sex"));
				expect(function() { o.ds_bmi(); }).toThrow(new DataMissingException("sex"));

				done();
			});
		});

		describe("with patient with sex", function() {
			it("should throw error everytime", function(done) {
				var i = ricketConsult_8819;
				var o = new application.models.File({}, new application.models.Patient({ 'Sex': 207 }));

				expect(function() { o.ageAtConsultTime(); }).toThrow(new DataMissingException("Date"));
				expect(function() { o.bmi(); }).toThrow(new DataMissingException("Height"));
				expect(function() { o.wh(); }).toThrow(new DataMissingException("Height"));
				expect(function() { o.ds_height(); }).toThrow(new DataMissingException("Date"));
				expect(function() { o.ds_weight(); }).toThrow(new DataMissingException("Date"));
				expect(function() { o.ds_weight_height(); }).toThrow(new DataMissingException("Height"));
				expect(function() { o.ds_bmi(); }).toThrow(new DataMissingException("Date"));

				done();
			});
		});

		describe("with ricketConsult_8819", function() {
			it("should have correct statistics", function(done) {
				var i = ricketConsult_8819;

				expect(folder.getSubFile(i).ageAtConsultTime()).toBe(16);
				expect(folder.getSubFile(i).bmi()).toBeCloseTo(30.57, 1);
				expect(folder.getSubFile(i).wh()).toBeCloseTo(0.3363, 3);
				expect(folder.getSubFile(i).ds_height()).toBeCloseTo(-9.570, 2);
				expect(folder.getSubFile(i).ds_weight()).toBeCloseTo(-3.588, 2);
				expect(folder.getSubFile(i).ds_weight_height()).toBeCloseTo(12.6105, 2);
				expect(folder.getSubFile(i).ds_bmi()).toBeCloseTo(2.391, 2);

				done();
			});
		});
	});

});
