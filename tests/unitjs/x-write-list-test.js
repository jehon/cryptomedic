'use strict';
/* global testComponent */

describe('test-x-write-list', function() {
  let listRadio  = [ 'truc' , 'brol' , 'machin', 'chose' ];
  let listSelect = [ 'truc' , 'brol' , 'machin', 'chose', 'bazar', 'ça', 'là' ];

  let checkRadio = (el, v) => {
    // Are we set?
    expect(el).not.toBeNull();
    expect(el.querySelector('input[type=radio]')).not.toBeNull();
    expect(el.querySelector('select')).toBeNull();
    expect(el.getAttribute('mode')).toBe("radio");

    // Check the value
    expect(el.querySelector('input[type=radio][value="' + v + '"]')).not.toBeNull();
    expect(el.querySelector('input[type=radio][value="' + v + '"]').hasAttribute('checked')).toBeTruthy();
  }

  let checkRadioNull = (el) => {
    // Are we set?
    expect(el).not.toBeNull();

    // Check the mode
    expect(el.querySelector('input[type=radio]')).not.toBeNull();
    expect(el.querySelector('select')).toBeNull();
    expect(el.getAttribute('mode')).toBe("radio");

    // Check the value
    expect(el.querySelector('input[type=radio][value=""]').hasAttribute('checked')).toBeTruthy();
    expect(el.getValue()).toBe(null);
  }

  let checkSelect = (el, v) => {
    // Are we set?
    expect(el).not.toBeNull();

    // Check the mode
    expect(el.querySelector('input[type=radio]')).toBeNull();
    expect(el.querySelector('select')).not.toBeNull();
    expect(el.getAttribute('mode')).toBe("select");

    // Check the value
    expect(el.querySelector('select').value).toBe(v);
    expect(el.getValue()).toBe(v);
  }

  let checkSelectNull = (el) => {
    // Are we set?
    expect(el).not.toBeNull();

    // Check the mode
    expect(el.querySelector('input[type=radio]')).toBeNull();
    expect(el.querySelector('select')).not.toBeNull();
    expect(el.getAttribute('mode')).toBe("select");

    // Check the value
    expect(el.querySelector('select').value).toBe('');
    expect(el.getValue()).toBe(null);
  }

  webDescribe("with emtpy list", `<x-write-list value='machin' list=''></x-write-list>`, function(element) {
    it("should render", function() {
      expect(element().getAttribute("mode")).toBe('empty');
      expect(element().querySelector('input[type=radio]')).toBeNull();
      expect(element().querySelector('select')).toBeNull();
    })
  })

  webDescribe("with emtpy list-name", `<x-write-list value='machin' list-name=''></x-write-list>`, function(element) {
    it("should render", function() {
      expect(element().getAttribute("mode")).toBe('empty');
      expect(element().querySelector('input[type=radio]')).toBeNull();
      expect(element().querySelector('select')).toBeNull();

      element().removeAttribute("list-name");
      expect(element().getAttribute("mode")).toBe('empty');
      expect(element().querySelector('input[type=radio]')).toBeNull();
      expect(element().querySelector('select')).toBeNull();
    })
  })

  it("should show RADIO when the list is < 5 items", function(done) {
    testComponent("<x-write-list value='machin' list='" + JSON.stringify(listRadio) + "'></x-write-list>").then(el => {
      expect(el).not.toBeNull()
      checkRadio(el, 'machin');
      el.testDone();
      done();
    });
  })

  it("should show SELECT when the list is > 5 items", function(done) {
    testComponent("<x-write-list value='machin' list='" + JSON.stringify(listSelect) + "'></x-write-list>").then(el => {

      checkSelect(el, 'machin');

      el.testDone();
      done();
    });
  })


  it("should handle RADIO nullable", function(done) {
    testComponent("<x-write-list nullable value='machin' list='" + JSON.stringify(listRadio) + "'></x-write-list>").then(el => {
      expect(el).not.toBeNull();
      expect(el.querySelector('input[type=radio][value=""]')).not.toBeNull();
      el.testDone();
      done();
    });
  })

  it("should handle SELECT nullable", function(done) {
    testComponent("<x-write-list nullable value='machin' list='" + JSON.stringify(listSelect) + "'></x-write-list>").then(el => {
      expect(el).not.toBeNull();
      expect(el.querySelector('select option[value=""]')).not.toBeNull();
      el.testDone();
      done();
    });
  })

  it("should handle RADIO with null", function(done) {
    testComponent("<x-write-list nullable value='' list='" + JSON.stringify(listRadio) + "'></x-write-list>").then(el => {
      checkRadioNull(el);
      el.testDone();
      done();
    });
  })

  it("should handle SELECT with null", function(done) {
    testComponent("<x-write-list nullable value='' list='" + JSON.stringify(listSelect) + "'></x-write-list>").then(el => {

      checkSelectNull(el);

      el.testDone();
      done();
    });
  });

  // Test changes in value
  it("should handle RADIO value change", function(done) {
    testComponent("<x-write-list nullable value='machin' list='" + JSON.stringify(listRadio) + "'></x-write-list>").then(el => {

      checkRadio(el, 'machin');
      el.setAttribute('value', 'truc');
      checkRadio(el, 'truc');

      el.testDone();
      done();
    });
  });

  it("should handle SELECT value change", function(done) {
    testComponent("<x-write-list nullable value='machin' list='" + JSON.stringify(listSelect) + "'></x-write-list>").then(el => {

      checkSelect(el, 'machin');
      el.setAttribute('value', 'truc');
      checkSelect(el, 'truc');

      el.testDone();
      done();
    });
  });

  // Test changes in html elements
  it("should handle RADIO html change", function(done) {
    testComponent("<x-write-list nullable value='machin' list='" + JSON.stringify(listRadio) + "'></x-write-list>").then(el => {
      checkRadio(el, 'machin');

      el.querySelector('input[type=radio][value=truc]').setAttribute('checked', true);

      checkRadio(el, 'truc');
      el.testDone();
      done();
    });
  });

  it("should handle SELECT html change", function(done) {
    testComponent("<x-write-list nullable value='machin' list='" + JSON.stringify(listSelect) + "'></x-write-list>").then(el => {

      checkSelect(el, 'machin');

      el.querySelector('select').value = 'truc';

      checkSelect(el, 'truc');
      el.testDone();
      done();
    });
  })

  // Test click on span for radio
  it("should handle RADIO Span click", function(done) {
    testComponent("<x-write-list nullable value='machin' list='" + JSON.stringify(listRadio) + "'></x-write-list>").then(el => {

      checkRadio(el, 'machin');
      el.querySelector('span[to=truc').click();

      checkRadio(el, 'truc');

      el.testDone();
      done();
    });
  })

  it("should handle named list", function(done) {
    testComponent("<x-write-list value='machin' list-name='listRadio'></x-write-list>").then(el => {
      expect(el).not.toBeNull();

      XWriteList.setReferences({
        listRadio: listRadio,
        listSelect: listSelect
      })

      checkRadio(el, 'machin');

      el.testDone();
      done();
    });
  })
});
