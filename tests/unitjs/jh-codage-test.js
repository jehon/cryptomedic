'use strict';
/* global testComponent */

describe('jh-codage-test', function() {
  describe("without cryptomedic", function() {
    beforeEach(function() {
      store.dispatch({ type: ACT_DEFINITIONS_STORE, payload: false });
    });

    it("should translate correctly when specified in globals", function(done) {
      store.dispatch({ type: ACT_DEFINITIONS_STORE, payload: false });
      testComponent("<jh-codage value='original'></jh-codage>").then(el => {
        expect(el).not.toBeNull();
        expect(el.shadowRoot).not.toBeNull();
        expect(el.shadowRoot.querySelector("#original").textContent).toBe('original');
        expect(el.shadowRoot.querySelector("#translating")).toBeNull();
        expect(el.shadowRoot.querySelector("#translated")).toBeNull();
        expect(el.getAttribute("calculated-translated")).toBe('');
        el.testDone();
        done();
      });
    });
  })

  describe("with cryptomedic", function() {
    beforeEach(function() {
      store.dispatch({ type: ACT_DEFINITIONS_STORE, payload: { 
        codes: {
          'original': 'codage'
        }
      }});
    });

    it("should handle empty values", function(done) {
      testComponent("<jh-codage value=''></jh-codage>").then(el => {
        expect(el).not.toBeNull();
        expect(el.shadowRoot.querySelector("#original").textContent).toBe('');
        expect(el.shadowRoot.querySelector("#translating")).toBeNull();
        expect(el.shadowRoot.querySelector("#translated")).toBeNull();
        expect(el.getAttribute("calculated-translated")).toBe('');
        el.testDone();
        done();
      });
    });

    it("should translate correctly when specified directly", function(done) {
      testComponent("<jh-codage value='original' translated='local'></jh-codage>").then(el => {
        expect(el).not.toBeNull();
        expect(el.shadowRoot).not.toBeNull();
        expect(el.shadowRoot.querySelector("#original")).toBeNull();
        expect(el.shadowRoot.querySelector("#translating").attributes.title.textContent).toEqual('original');
        expect(el.shadowRoot.querySelector("#translated").textContent).toEqual('local');
        expect(el.getAttribute("calculated-translated")).toBe('local');
        el.testDone();
        done();
      });
    });

    it("should translate correctly when specified in globals", function(done) {
      testComponent("<jh-codage value='original'></jh-codage>").then(el => {
        expect(el).not.toBeNull();
        expect(el.shadowRoot).not.toBeNull();
        expect(el.shadowRoot.querySelector("#original")).toBeNull();
        expect(el.shadowRoot.querySelector("#translating").attributes.title.textContent).toEqual('original');
        expect(el.shadowRoot.querySelector("#translated").textContent).toEqual('codage');
        expect(el.getAttribute("calculated-translated")).toBe('codage');
        el.testDone();
        done();
      });
    });

    it("should translate invalid codes", function(done) {
      testComponent("<jh-codage value='anything'></jh-codage>").then(el => {
        expect(el).not.toBeNull();
        expect(el.shadowRoot.querySelector("#original").textContent).toBe('anything');
        expect(el.shadowRoot.querySelector("#translating")).toBeNull();
        expect(el.shadowRoot.querySelector("#translated")).toBeNull();
        expect(el.getAttribute("calculated-translated")).toBe('');
        el.testDone();
        done();
      });
    });

    it("should handle changes in values", function(done) {
      testComponent("<jh-codage value=''></jh-codage>").then(el => {
        expect(el).not.toBeNull();
        expect(el.shadowRoot.querySelector("#original").textContent).toBe('');
        expect(el.shadowRoot.querySelector("#translating")).toBeNull();
        expect(el.shadowRoot.querySelector("#translated")).toBeNull();
        expect(el.getAttribute("calculated-translated")).toBe('');

        el.setAttribute('value', 'original');

        expect(el.shadowRoot.querySelector("#original")).toBeNull();
        expect(el.shadowRoot.querySelector("#translating").attributes.title.textContent).toEqual('original');
        expect(el.shadowRoot.querySelector("#translated").textContent).toEqual('codage');
        expect(el.getAttribute("calculated-translated")).toBe('codage');

        el.testDone();
        done();
      });
    });
  });
});
