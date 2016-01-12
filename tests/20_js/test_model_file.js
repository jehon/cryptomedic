"use strict";

describe("File", function() {
  var ricketConsult_8819 = 5;
  var clubFoot_695 = 2;

  describe("with mock_patient_10.json", function() {
    var folder = appState().helpers.create("Folder");
    it("should have correct properties", function(done) {
    // Go through the rest_service !!!
      loadMock("mock_patient_10.json", "Folder").then(function(folder) {
        expect(folder instanceof appState().helpers.create("Folder").constructor).toBeTruthy();

        expect(folder.getMainFile() instanceof appState().helpers.create("Patient").constructor).toBeTruthy();
        expect(folder.getMainFile().Sex).toBe(207);
        expect(folder.getMainFile().Yearofbirth).toBe(1998);
        expect(folder.getMainFile().actualAge(new Date("2014-01-01"))).toBe("16y0m");

        angular.forEach(folder.getSubFiles(), function(val, i) { console.log(i + ": " + val._type + "#" + val.id); });

        var i;
        i = ricketConsult_8819;
        expect(folder.getSubFile(i) instanceof appState().helpers.create("File").constructor).toBeTruthy();
        expect(folder.getSubFile(i) instanceof appState().helpers.create("RicketConsult").constructor).toBeTruthy();
        expect(folder.getSubFile(i).id).toBe(8819);
        expect(folder.getSubFile(i).getPatient() instanceof appState().helpers.create("Patient").constructor).toBeTruthy();
        expect(folder.getSubFile(i).Date).toEqual("2014-06-04");
        expect(folder.getSubFile(i).ageAtConsultTime(true)).toBe("16y5m");

        i = clubFoot_695;
        expect(folder.getSubFile(i) instanceof appState().helpers.create("File").constructor).toBeTruthy();
        expect(folder.getSubFile(i) instanceof appState().helpers.create("ClubFoot").constructor).toBeTruthy();
        expect(folder.getSubFile(i).id).toBe(695);
        expect(folder.getSubFile(i).getPatient() instanceof appState().helpers.create("Patient").constructor).toBeTruthy();
        expect(folder.getSubFile(i).Date).toEqual("2014-04-17");
        expect(folder.getSubFile(i).ageAtConsultTime()).toBe(16.25);

        done();
      });
    });
    describe("with empty object", function() {
      it("should throw error everytime", function(done) {
        var o = appState().helpers.create("File", {}, appState().helpers.create("Folder"));

        console.log("get patient:", this.getPatient());

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
        var folder = appState().helpers.create("Folder");
        folder.mainFile = appState().helpers.create("Patient", { "Sex": 207 });
        var o = appState().helpers.create("File", {}, folder);

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

    describe("with ricketConsult_8819", function() {
      it("should have correct statistics", function(done) {
        var i = ricketConsult_8819;

        expect(folder.getSubFile(i).id).toBe(8819);
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
