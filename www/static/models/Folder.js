/* global Data, Patient, amd_stats, Appointment, Bill, ClubFoot, OtherConsult, Payment, Picture, RicketConsult, Surgery */
/* exported Folder */
'use strict';

// TODO: Adapt for: ctrl_folder
// TODO: Adapt for: ctrl_file_bill

class Folder extends Data {
  static string2class(type) {
    console.assert(typeof type == "string", "create[type/1] expect a string")
    switch(type) {
      case 'Patient':        return Patient;
      case 'Appointment':    return Appointment;
      case 'Bill':           return Bill;
      case 'ClubFoot':       return ClubFoot;
      case 'OtherConsult':   return OtherConsult;
      case 'Payment':        return Payment;
      case 'Picture':        return Picture;
      case 'RicketConsult':  return RicketConsult;
      case 'Surgery':        return Surgery;
    }
    throw Error("Type not found: ", type);
  }

  static create(type, data = {}) {
    return new (this.string2class(type))(data);
  }

  constructor(listing = {}) {
    super({});
    this.headers = {};
    if (typeof(listing) != undefined) {
      this.list = [];

      // create the objects
      for(let i in listing) {
        let v = listing[i];
        this.list.push(Folder.create(v.type, v.record));
      }

      this.getFilesRelatedToPatient().forEach(f => {
        if (f.linkPatient) {
          f.linkPatient(this.getPatient());
        }
      })

      // TODO: Does the payment need the link to the bills?
      // this.getListByType(Bill).forEach(b => {
      //   this.getFilesRelatedToBill(b.id).forEach(bi => {
      //     bi.set
      //   })
      // })
    }
  }

  getId() {
    if (this.getPatient()) {
      return this.getPatient().id + "";
    }
    return -1;
  }

  getListByType(type) {
    console.assert(type instanceof Function, "getListByType[type/1] expect a class");
    let res = [];
    for(let i in this.list) {
      if (this.list[i] instanceof type) {
        res.push(this.list[i]);
      }
    }
    return res;
  }

  getByTypeAndId(type, id) {
    let list = this.getListByType(type);
    for(let i in list) {
      if (list[i].id + "" == id + "") {
        return list[i];
      }
    }
    return null;
  }

  getByFieldValue(field, value) {
    let res = [];
    for(let i in this.list) {
      if (this.list[i][field] == value) {
        res.push(this.list[i]);
      }
    }
    return res;
  }

  getPatient() {
    let list = this.getListByType(Patient);
    if (list.length == 0) {
      // Always have a patient
      let p = new Patient();
      this.list.push(p);
      return p;
    }
    return list[0];
  }

  getFilesRelatedToPatient() {
    if (!this.getPatient()) {
      return [];
    }
    return this.getByFieldValue('patient_id', this.getPatient().id).sort(Folder.ordering);
  }

  getFilesRelatedToBill(id) {
    return this.getByFieldValue('bill_id', id).sort(Folder.ordering);
  }

  setHeader(key, value) {
    this.headers[key] = value;
  }

  getHeader(key) {
    return this.headers[key];
  }

  static ordering(o1, o2) {
    var o1First = -1;
    var o2First = 1;
    // Return 1 if o1 > o2 (o1 - o2) (o1 est apr�s o2)
    // Return -1 if o1 < o2 (o1 - o2) (o1 est avant o2)

    // What to do if one 'id' is missing
    if (typeof(o1.id) == 'undefined') {
      if (typeof(o2.id) != 'undefined') {
        return o1First;
      }
    } else {
      if (typeof(o2.id) == 'undefined') {
        return o2First;
      }
    }

    // What to do if one 'type' is missing
    if (typeof(o1.getModel()) == 'undefined') {
      if (typeof(o2.getModel()) != 'undefined') return o1First;
    } else {
      if (typeof(o2.getModel()) == 'undefined') return o2First;
    }

    // What to do if one 'Date' is missing
    if (typeof(o1.Date) == 'undefined') {
      if (typeof(o2.Date) != 'undefined') return o1First;
    } else {
      if (typeof(o2.Date) == 'undefined') return o2First;
    }

    // Both 'date' are present
    if (typeof(o1.Date) != 'undefined' && typeof(o2.Date) != 'undefined') {
      if (o1.Date < o2.Date) return o2First;
      if (o1.Date > o2.Date) return o1First;
    }

    // Both 'type' are present
    if (typeof(o1.getModel()) != 'undefined' && typeof(o2.getModel()) != 'undefined') {
      if (o1.getModel() < o2.getModel()) return o1First;
      if (o1.getModel() > o2.getModel()) return o2First;
    }

    // Both 'id' are present
    if (typeof(o1.id) != 'undefined' && typeof(o2id) != 'undefined') {
      if (o1.id > o2.id) return o1First;
      if (o1.id < o2.id) return o2First;
    }
    return 0;
  }

  graphic_dimensions(axis_x, axis_y) {
    return amd_stats.dimensions[axis_x + '_' + axis_y + '_' + this.getPatient().sexStr()];
  }
}
