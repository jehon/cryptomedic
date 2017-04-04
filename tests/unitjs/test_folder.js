'use strict';
/* global loadReference, Folder, Patient */

describe('test_folder', function() {
  beforeEach(() => {
    let json = loadReference('FolderTest.test1.json');
    this.f = new Folder(json);
    expect(this.f).toEqual(jasmine.any(Folder));
  });

  it("sould instanciate folder", () => {
    let f = new Folder();
    expect(this.f).toEqual(jasmine.any(Folder));
    expect(f).toEqual(jasmine.any(Folder));
  });

  it("should load Mock data", () => {
    expect(this.f).toEqual(jasmine.any(Folder));
    expect(this.f.id).toBe('1');
    expect(this.f.getId()).toBe('1');
  })

  it("should instanciate classes", () => {
    console.log(this.f);
    console.log(this.f.getPatient());
    expect(this.f.getPatient()).toEqual(jasmine.any(Patient));
  })
})