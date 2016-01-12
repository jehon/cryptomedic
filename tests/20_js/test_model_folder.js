"use strict";

describe("Folder", function() {
  describe("with empty loader", function() {
    var folder = new cryptomedic.models.Folder();
    it("should have inheritance ok", function() {
      expect(folder instanceof appState().helpers.create("Folder").constructor).toBeTruthy();
      expect(folder instanceof appState().helpers.create("Data").constructor).toBeTruthy();
    });
  });

  describe("with mock_patient_10.json", function() {
    // var folder = new cryptomedic.models.Folder();
    it("should load correctly and store it", function (done) {
      loadFrom("/base/tests/js/mocks/mock_patient_10.json", "Folder").then(function(folder) {
        expect(folder instanceof appState().helpers.create("Folder").constructor).toBeTruthy();
        expect(folder instanceof appState().helpers.create("Folder").constructor).toBeTruthy();
        expect(folder.id).toBe(10);
        expect(folder.getId()).toBe(10);
        expect(folder.getSubFiles().length).toBe(7);
        expect(folder.getSubFile(9)).toBe(null);
        expect(folder.getMainFile() instanceof appState().helpers.create("Patient").constructor).toBeTruthy();
        expect(folder.getMainFile().id).toBe(10);
        done();
      });
    });
  });
});
