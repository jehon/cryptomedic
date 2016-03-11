import { loadMock } from 'helpers';
import { DataMissingException } from 'helpers/exceptions';
// import create       from 'helpers/create';

describe('File', function() {
  var ricketConsult_8819 = 6;
  var clubFoot_695 = 4;

  describe('with mock_patient_10.json', function() {
    it('should have correct properties', function(done) {
      // Go through the rest_service !!!
      loadMock('mock_patient_10.json', 'Folder').then(function(folder) {
        expect(folder instanceof appState().helpers.create('Folder').constructor).toBeTruthy('Object is not a Folder');

        expect(folder.getMainFile() instanceof appState().helpers.create('Patient').constructor).toBeTruthy('Object is not a patient');
        expect(folder.getMainFile().Sex).toBe('Male');
        expect(folder.getMainFile().Yearofbirth).toBe(1998);
        expect(folder.getMainFile().actualAge(new Date('2014-01-01'))).toBe('16y0m');

        for(var ii in folder.getSubFiles()) { console.log(ii + ': ' + folder.getSubFiles()[ii].getModel() + '#' + folder.getSubFiles()[ii].id); }

        var i;
        i = ricketConsult_8819;
        expect(folder.getSubFile(i) instanceof appState().helpers.create('File').constructor).toBeTruthy();
        expect(folder.getSubFile(i) instanceof appState().helpers.create('RicketConsult').constructor).toBeTruthy();
        expect(folder.getSubFile(i).id).toBe(8819);
        expect(folder.getSubFile(i).getPatient() instanceof appState().helpers.create('Patient').constructor).toBeTruthy();
        expect(folder.getSubFile(i).Date).toEqual('2014-01-04');
        expect(folder.getSubFile(i).ageAtConsultTime(true)).toBe('16y0m');

        i = clubFoot_695;
        expect(folder.getSubFile(i) instanceof appState().helpers.create('File').constructor).toBeTruthy();
        expect(folder.getSubFile(i) instanceof appState().helpers.create('ClubFoot').constructor).toBeTruthy();
        expect(folder.getSubFile(i).id).toBe(695);
        expect(folder.getSubFile(i).getPatient() instanceof appState().helpers.create('Patient').constructor).toBeTruthy();
        expect(folder.getSubFile(i).Date).toEqual('2014-04-17');
        expect(folder.getSubFile(i).ageAtConsultTime()).toBe(16.25);

        done();
      });
    });
    describe('with ricketConsult_8819', function() {
      it('should have correct statistics', function(done) {
        loadMock('mock_patient_10.json', 'Folder').then(function(folder) {
          var i = ricketConsult_8819;

          expect(folder.getSubFile(i).id).toBe(8819);
          expect(folder.getSubFile(i).ageAtConsultTime()).toBeCloseTo(16, 2);
          expect(folder.getSubFile(i).bmi()).toBeCloseTo(30.57, 1);
          expect(folder.getSubFile(i).wh()).toBeCloseTo(0.3363, 3);
          try {
            folder.getSubFile(i).ds_height();
          } catch(e) {
            console.error('ds_height', e, e.message, e.fileName, e.lineNumber);
          }
          expect(folder.getSubFile(i).ds_height()).toBeCloseTo(-9.570, 2);
          expect(folder.getSubFile(i).ds_weight()).toBeCloseTo(-3.588, 2);
          expect(folder.getSubFile(i).ds_weight_height()).toBeCloseTo(12.6105, 2);
          expect(folder.getSubFile(i).ds_bmi()).toBeCloseTo(2.391, 2);

          done();
        });
      });
    });
  });

  describe('with patient with sex', function() {
    it('should throw error everytime', function(done) {
      var folder = appState().helpers.create('Folder');
      folder.mainFile = appState().helpers.create('Patient', { 'Sex': 'Male' });
      var o = appState().helpers.create('File', {}, folder);

      expect(function() { o.ageAtConsultTime(); }).toThrow(new DataMissingException('Date'));
      expect(function() { o.bmi(); }).toThrow(new DataMissingException('Height'));
      expect(function() { o.wh(); }).toThrow(new DataMissingException('Height'));
      expect(function() { o.ds_height(); }).toThrow(new DataMissingException('Date'));
      expect(function() { o.ds_weight(); }).toThrow(new DataMissingException('Date'));
      expect(function() { o.ds_weight_height(); }).toThrow(new DataMissingException('Height'));
      expect(function() { o.ds_bmi(); }).toThrow(new DataMissingException('Date'));

      done();
    });
  });

  // describe('with empty object', function() {
  //   it('should throw error everytime', function(done) {
  //     var o = appState().helpers.create('File', {}, appState().helpers.create('Folder'));

  //     console.log('get patient:', this.getPatient());

  //     expect(function() { o.ageAtConsultTime(); }).toThrow(new DataMissingException('Date'));
  //     expect(function() { o.bmi(); }).toThrow(new DataMissingException('Height'));
  //     expect(function() { o.wh(); }).toThrow(new DataMissingException('Height'));
  //     expect(function() { o.ds_height(); }).toThrow(new DataMissingException('sex'));
  //     expect(function() { o.ds_weight(); }).toThrow(new DataMissingException('sex'));
  //     expect(function() { o.ds_weight_height(); }).toThrow(new DataMissingException('sex'));
  //     expect(function() { o.ds_bmi(); }).toThrow(new DataMissingException('sex'));

  //     done();
  //   });
  // });

});
