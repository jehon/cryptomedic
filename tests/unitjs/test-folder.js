'use strict';
/* global loadReference, Folder, Patient, OtherConsult, RicketConsult, Appointment, Bill, Payment, Picture */

describe('test_folder', function() {
  beforeEach(() => {
    this.f = new Folder(loadReference('FolderTest.test1.json'));
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
    expect(this.f.getPatient()).toEqual(jasmine.any(Patient));
    expect(this.f.getPatient().id).toBe(1);
  })

  it("should query specific element (Otherconsult 1)", () => {
    expect(this.f.getByTypeAndId(OtherConsult, 1)).toEqual(jasmine.any(OtherConsult));
    expect(this.f.getByTypeAndId(OtherConsult, 1).id).toBe(1);
  })

  it("should give patient related files", () => {
    let list = this.f.getFilesRelatedToPatient();
    expect(list.length).toBe(5);

    list.forEach(e => {
      expect(e.getPatient().id).toBe(1);
    })

    let i = -1;
    i++;
    expect(list[i]).toEqual(jasmine.any(Picture));
    expect(list[i].id).toBe(2);

    i++;
    expect(list[i]).toEqual(jasmine.any(RicketConsult));
    expect(list[i].id).toBe(13);

    i++;
    expect(list[i]).toEqual(jasmine.any(Bill));
    expect(list[i].id).toBe(1);

    i++;
    expect(list[i]).toEqual(jasmine.any(Appointment));
    expect(list[i].id).toBe(2);

    i++;
    expect(list[i]).toEqual(jasmine.any(OtherConsult));
    expect(list[i].id).toBe(1);
  })

  it("should give bill related files", () => {
    let list = this.f.getFilesRelatedToBill(1);
    expect(list.length).toBe(1);

    let i = -1;
    i++;
    expect(list[i]).toEqual(jasmine.any(Payment));
    expect(list[i].id).toBe(3);
    expect(list[i].bill_id).toBe(1);
  })
})