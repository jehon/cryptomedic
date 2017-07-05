'use strict';
/* global testComponent */

describe('test-write-list', function() {
  it("should initalize with value=-1", (done) => {
    testComponent("<edit-price value='-1'></edit-price>").then(el => {
      expect(el).not.toBeNull();
      expect(el.shadowRoot.querySelectorAll('input[type=radio]').length).toBe(3);
      expect(el.shadowRoot.querySelector('input[type=radio][checked][value="-1"]')).not.toBeNull();
      expect(el.shadowRoot.querySelector('input[type=radio][checked][value="1"]' )).toBeNull();
      expect(el.shadowRoot.querySelector('input[type=radio][checked][value="0"]' )).toBeNull();

      expect(el.shadowRoot.querySelector('input[type=number]')).toBeNull();

      expect(el.value).toBe('-1');

      el.testDone();
      done();
    });
  })

  it("should initalize with value=1", (done) => {
    testComponent("<edit-price value='1'></edit-price>").then(el => {
      expect(el).not.toBeNull();
      expect(el.shadowRoot.querySelectorAll('input[type=radio]').length).toBe(3);
      expect(el.shadowRoot.querySelector('input[type=radio][checked][value="1"]' )).not.toBeNull();
      expect(el.shadowRoot.querySelector('input[type=radio][checked][value="-1"]')).toBeNull();
      expect(el.shadowRoot.querySelector('input[type=radio][checked][value="0"]' )).toBeNull();

      expect(el.shadowRoot.querySelector('input[type=number]')).toBeNull();

      expect(el.value).toBe('1');

      el.testDone();
      done();
    });
  })

  it("should initalize with value 200", (done) => {
    testComponent("<edit-price value='200'></edit-price>").then(el => {

      expect(el).not.toBeNull();
      expect(el.shadowRoot.querySelectorAll('input[type=radio]').length).toBe(3);
      expect(el.shadowRoot.querySelector('input[type=radio][checked][value="1"]' )).toBeNull();
      expect(el.shadowRoot.querySelector('input[type=radio][checked][value="-1"]')).toBeNull();
      expect(el.shadowRoot.querySelector('input[type=radio][checked][value="0"]' )).not.toBeNull();

      expect(el.shadowRoot.querySelector('input[type=number]')).not.toBeNull();
      expect(el.shadowRoot.querySelector('input[type=number]').value).toBe('200');

      expect(el.value).toBe('200');

      el.testDone();
      done();
    });
  })
});
