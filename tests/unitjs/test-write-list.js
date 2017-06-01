'use strict';
/* global testComponent */

fdescribe('test-write-list', function() {
  let listRadio  = [ 'truc' , 'brol' , 'machin', 'chose' ];
  let listSelect = [ 'truc' , 'brol' , 'machin', 'chose', 'bazar', 'ça', 'là' ];

  let checkRadio = (el, v) => {
    // Are we set?
    expect(el).not.toBeNull();
    expect(el.shadowRoot.querySelector('input[type=radio]')).not.toBeNull();
    expect(el.shadowRoot.querySelector('select')).toBeNull();
    expect(el.getAttribute('mode')).toBe("radio");

    // Check the value
    // expect(el.value).toBe(v);
    expect(el.shadowRoot.querySelector('input[type=radio][value="' + v + '"]')).not.toBeNull();
    expect(el.shadowRoot.querySelector('input[type=radio][value="' + v + '"]').hasAttribute('checked')).toBeTruthy();
  }

  let checkRadioNull = (el) => {
    // Are we set?
    expect(el).not.toBeNull();

    // Check the mode
    expect(el.shadowRoot.querySelector('input[type=radio]')).not.toBeNull();
    expect(el.shadowRoot.querySelector('select')).toBeNull();
    expect(el.getAttribute('mode')).toBe("radio");

    // Check the value
    expect(el.shadowRoot.querySelector('input[type=radio][value=""]').hasAttribute('checked')).toBeTruthy();
    expect(el.value).toBe(null);
  }

  let checkSelect = (el, v) => {
    // Are we set?
    expect(el).not.toBeNull();

    // Check the mode
    expect(el.shadowRoot.querySelector('input[type=radio]')).toBeNull();
    expect(el.shadowRoot.querySelector('select')).not.toBeNull();
    expect(el.getAttribute('mode')).toBe("select");

    // Check the value
    expect(el.shadowRoot.querySelector('select').value).toBe(v);
    expect(el.value).toBe(v);
  }

  let checkSelectNull = (el) => {
    // Are we set?
    expect(el).not.toBeNull();

    // Check the mode
    expect(el.shadowRoot.querySelector('input[type=radio]')).toBeNull();
    expect(el.shadowRoot.querySelector('select')).not.toBeNull();
    expect(el.getAttribute('mode')).toBe("select");

    // Check the value
    expect(el.shadowRoot.querySelector('select').value).toBe('');
    // expect(el.shadowRoot.querySelector("option[null]").getAttribute('selected')).toBe('selected');
    expect(el.value).toBe(null);
  }

  it("should show RADIO when the list is < 5 items", function(done) {
    testComponent("<write-list value='machin' list='" + JSON.stringify(listRadio) + "'></write-list>").then(el => {
      expect(el).not.toBeNull()
      checkRadio(el, 'machin');
      el.testDone();
      done();
    });
  })

  it("should show SELECT when the list is > 5 items", function(done) {
    testComponent("<write-list value='machin' list='" + JSON.stringify(listSelect) + "'></write-list>").then(el => {

      checkSelect(el, 'machin');

      el.testDone();
      done();
    });
  })


  it("should handle RADIO nullable", function(done) {
    testComponent("<write-list nullable value='machin' list='" + JSON.stringify(listRadio) + "'></write-list>").then(el => {
      expect(el).not.toBeNull();
      expect(el.shadowRoot.querySelector('input[type=radio][value=""]')).not.toBeNull();
      el.testDone();
      done();
    });
  })

  it("should handle SELECT nullable", function(done) {
    testComponent("<write-list nullable value='machin' list='" + JSON.stringify(listSelect) + "'></write-list>").then(el => {
      expect(el).not.toBeNull();
      expect(el.shadowRoot.querySelector('select option[value=""]')).not.toBeNull();
      el.testDone();
      done();
    });
  })

  it("should handle RADIO with null", function(done) {
    testComponent("<write-list nullable value='' list='" + JSON.stringify(listRadio) + "'></write-list>").then(el => {

      checkRadioNull(el);

      el.testDone();
      done();
    });
  })

  it("should handle SELECT with null", function(done) {
    testComponent("<write-list nullable value='' list='" + JSON.stringify(listSelect) + "'></write-list>").then(el => {

      checkSelectNull(el);

      el.testDone();
      done();
    });
  });

  // Test changes in value
  it("should handle RADIO value change", function(done) {
    testComponent("<write-list nullable value='machin' list='" + JSON.stringify(listRadio) + "'></write-list>").then(el => {

      checkRadio(el, 'machin');
      el.setAttribute('value', 'truc');
      checkRadio(el, 'truc');

      el.testDone();
      done();
    });
  });

  it("should handle SELECT value change", function(done) {
    testComponent("<write-list nullable value='machin' list='" + JSON.stringify(listSelect) + "'></write-list>").then(el => {

      checkSelect(el, 'machin');
      el.setAttribute('value', 'truc');
      checkSelect(el, 'truc');

      el.testDone();
      done();
    });
  });

  // Test changes in html elements
  it("should handle RADIO html change", function(done) {
    testComponent("<write-list nullable value='machin' list='" + JSON.stringify(listRadio) + "'></write-list>").then(el => {
      checkRadio(el, 'machin');

      el.shadowRoot.querySelector('input[type=radio][value=truc]').setAttribute('checked', true);

      checkRadio(el, 'truc');
      el.testDone();
      done();
    });
  });

  it("should handle SELECT html change", function(done) {
    testComponent("<write-list nullable value='machin' list='" + JSON.stringify(listSelect) + "'></write-list>").then(el => {

      checkSelect(el, 'machin');

      el.shadowRoot.querySelector('select').value = 'truc';
      // Change events are not triggered by javascript, so we act ourself...
      el.updateValueFromSelect();
      checkSelect(el, 'truc');
      el.testDone();
      done();
    });
  })

  // Test click on span for radio
  it("should handle RADIO Span click", function(done) {
    testComponent("<write-list nullable value='machin' list='" + JSON.stringify(listRadio) + "'></write-list>").then(el => {

      checkRadio(el, 'machin');
      // Simulate the click
      el.updateValueFromSpan({ currentTarget: { to: 'truc' }});
      checkRadio(el, 'truc');

      el.testDone();
      done();
    });
  })
});
