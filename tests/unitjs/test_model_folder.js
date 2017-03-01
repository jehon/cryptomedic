
describe('Folder', function() {
  describe('with empty loader', function() {
    var folder = create('Folder');
    it('should have inheritance ok', function() {
      expect(folder instanceof create('Folder').constructor).toBeTruthy('Folder is not an instance of Folder');
      expect(folder instanceof create('Data').constructor).toBeTruthy('Folder is not an instance of Data');
    });
  });

  describe('with mock_patient_10', function() {
    // var folder = new cryptomedic.models.Folder();
    it('should load correctly and store it', function (done) {
      loadMock('mock_patient_10', 'Folder').then(function(folder) {
        expect(folder instanceof create('Folder').constructor).toBeTruthy('mock_patient_10 is not an instance of Folder');
        expect(folder.id).toBe(10);
        expect(folder.getId()).toBe(10);
        expect(folder.getSubFiles().length).toBe(7);
        expect(folder.getSubFile(9)).toBe(null);
        expect(folder.getMainFile() instanceof create('Patient').constructor).toBeTruthy('mock_patient_10 is not an instance of Patient');
        expect(folder.getMainFile().id).toBe(10);
        done();
      });
    });
  });
});
