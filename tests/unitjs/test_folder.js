'use strict';
/* global loadReference, Folder, Patient, OtherConsult, RicketConsult */

describe('test_folder', function() {
  beforeEach(() => {
    this.f1 = new Folder(loadReference('FolderTest.test1.json'));
    expect(this.f1).toEqual(jasmine.any(Folder));

    this.f6 = new Folder(loadReference('FolderTest.test6.json'));
    expect(this.f6).toEqual(jasmine.any(Folder));
  });

  it("sould instanciate folder", () => {
    let f = new Folder();
    expect(this.f1).toEqual(jasmine.any(Folder));
    expect(f).toEqual(jasmine.any(Folder));
  });

  it("should load Mock data", () => {
    expect(this.f1).toEqual(jasmine.any(Folder));
    expect(this.f1.id).toBe('1');
    expect(this.f1.getId()).toBe('1');
  })

  it("should instanciate classes", () => {
    expect(this.f1.getPatient()).toEqual(jasmine.any(Patient));
    expect(this.f1.getPatient().id).toBe(1);
  })

  it("should query specific element (Otherconsult 1)", () => {
    expect(this.f1.getByTypeAndId(OtherConsult, 1)).toEqual(jasmine.any(OtherConsult));
    expect(this.f1.getByTypeAndId(OtherConsult, 1).id).toBe(1);
  })

  it("should query specific element (RicketConsult 1)", () => {
    expect(this.f6.getByTypeAndId(RicketConsult, 1)).toEqual(jasmine.any(RicketConsult));
    expect(this.f6.getByTypeAndId(RicketConsult, 1).id).toBe(1);
  })

})