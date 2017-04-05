/* global loadReference, Folder, Patient, Item, RicketConsult */
describe('Item', function() {
  // var ricketConsult_8819 = 6;
  // var clubFoot_695 = 4;

  describe('with mock_patient_10', function() {
    it('should have correct properties', function() {
      // Go through the rest_service !!!
      let folder = new Folder(loadReference('FolderTest.test1.json'));

      expect(folder.getPatient()).toEqual(jasmine.any(Patient));
      expect(folder.getPatient().Sex).toBe('Male');
      expect(folder.getPatient().Yearofbirth).toBe("1998");
      expect(folder.getPatient().actualAge(new Date('2014-01-01'))).toBe('16y0m');

      let rc = folder.getByTypeAndId(RicketConsult, 13);

      expect(rc).toEqual(jasmine.any(Item));
      expect(rc).toEqual(jasmine.any(RicketConsult));
      expect(rc).toEqual(jasmine.anything({ id: 13 }));
      expect(rc.getPatient()).toEqual(jasmine.any(Patient));
      expect(rc.Date).toEqual('2014-01-14');
      expect(rc.ageAtConsultTime()).toBe(16);
      expect(rc.ageAtConsultTime(true)).toBe('16y0m');
    });

    describe('with ricketConsult_13', function() {
      it('should have correct statistics', function() {

        let folder = new Folder(loadReference('FolderTest.test1.json'));
        let rc = folder.getByTypeAndId(RicketConsult, 13);

        expect(rc).toEqual(jasmine.any(RicketConsult));
        expect(rc).toEqual(jasmine.anything({ id: 13 }));
        expect(rc.ageAtConsultTime()).toBeCloseTo(16, 2);
        expect(rc.bmi()).toBeCloseTo(30.57, 1);
        expect(rc.wh()).toBeCloseTo(0.3363, 3);
        try {
          rc.ds_height();
        } catch(e) {
          console.error('ds_height', e, e.message, e.fileName, e.lineNumber);
        }
        expect(rc.ds_height()).toBeCloseTo(-9.570, 2);
        expect(rc.ds_weight()).toBeCloseTo(-3.588, 2);
        expect(rc.ds_weight_height()).toBeCloseTo(12.6105, 2);
        expect(rc.ds_bmi()).toBeCloseTo(2.391, 2);
      });
    });
  });

  describe('with patient with sex', function() {
    it('should throw error everytime', function(done) {
      var folder = new Folder();
      folder.mainFile = new Patient({ 'Sex': 'Male' });
      var o = new Item({}, folder);

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
});
