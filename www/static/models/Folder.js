/* global Data, Patient, amd_stats, Appointment, Bill, ClubFoot, OtherConsult, Payment, Picture, RicketConsult, Surgery */
/* exported Folder */
'use strict';

// TODO: Adapt for: ctrl_folder
// TODO: Adapt for: ctrl_file_bill

class Folder extends Data {
  static create(row) {
    switch(row.type) {
      case 'Patient':        return new Patient(row.record);
      case 'Appointment':    return new Appointment(row.record);
      case 'Bill':           return new Bill(row.record);
      case 'ClubFoot':       return new ClubFoot(row.record);
      case 'OtherConsult':   return new OtherConsult(row.record);
      case 'Payment':        return new Payment(row.record);
      case 'Picture':        return new Picture(row.record);
      case 'RicketConsult':  return new RicketConsult(row.record);
      case 'Surgery':        return new Surgery(row.record);
    }
    throw Error("Type not found: ", row.type);
  }

  constructor(data = {}) {
    super({});
    if (typeof(data) != undefined && typeof(data.id) != undefined) {
      this.id = data.id;
      this.list = [];

      // create the objects
      for(let i in data.folder) {
        let v = data.folder[i];
        this.list.push(Folder.create(v));
      }

      this.getFilesRelatedToPatient().forEach(f => {
        f.linkPatient(this.getPatient());
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
    if (this.isSet('id')) {
      return this.id;
    }
    return -1;
  }

  getListByType(type) {
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
    return this.getListByType(Patient)[0];
  }

  getFilesRelatedToPatient() {
    return this.getByFieldValue('patient_id', this.id).sort(Folder.ordering);
  }

  getFilesRelatedToBill(id) {
    return this.getByFieldValue('bill_id', id).sort(Folder.ordering);
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


  sort() {
    this.subFiles.sort(Folder.ordering);
  }

  setMainFile(file) {
    this.id = file.id;
    this.mainFile = file;
  }

  addSubFile(subFile) {
    subFile.linkPatient(this.getMainFile());
    this.subFiles.push(subFile);
  }

  getMainFile() {
    if (this.isSet('mainFile')) {
      return this.mainFile;
    }
    return new Patient();
  }

  getSubFiles() {
    return this.subFiles;
  }

  getSubFile(i) {
    if (i >= this.subFiles.length) return null;
    return this.subFiles[i];
  }

  getSubFileByType(type, id) {
    for(let f of this.subFiles) {
      if (f.getModel() == type && f.id == id) {
        return f;
      }
    }
    return null;
  }

  graphic_dimensions(axis_x, axis_y) {
    return amd_stats.dimensions[axis_x + '_' + axis_y + '_' + this.getMainFile().sexStr()];
  }

}
