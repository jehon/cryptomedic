'use strict';
/* global testComponent */

describe('test jh-select', function() {
  it("should radio correctly", function(done) {
    let list = [ 'truc' , 'brol' , 'machin', 'chose' ];
    testComponent("<jh-select value='truc' list='" + JSON.stringify(list) + "'></jh-select>").then(el => {
      expect(el).not.toBeNull();
      expect(el.$$('input[type=radio]')).not.toBeNull();
      expect(el.$$('select').clientHeight).toBe(0);
      expect(el.$$('input[type=radio][value=\'truc\']:checked')).not.toBeNull();
      expect(el.value).toBe("truc");

      el.value = 'brol';
      expect(el.$$('input[type=radio][value="truc"]:checked')).toBeNull();
      expect(el.$$('input[type=radio][value="brol"]:checked')).not.toBeNull();
      expect(el.value).toBe("brol");

      el.testDone();
      done();
    });
  });


  it("should select correctly", function(done) {
    let list = [ 'truc' , 'brol' , 'machin', 'chose', 'bazar', 'ça', 'là' ];
    testComponent("<jh-select value='truc' list='" + JSON.stringify(list) + "'></jh-select>").then(el => {
      expect(el).not.toBeNull();
      expect(el.$$('input[type=radio]').clientHeight).toBe(0);
      expect(el.$$('select').clientHeight).not.toBe(0);
      expect(el.$$('select').value).toBe('truc');
      expect(el.value).toBe("truc");

      el.value = 'brol';
      expect(el.$$('select').value).toBe('brol');
      expect(el.value).toBe("brol");

      el.testDone();
      done();
    });
  });
});
