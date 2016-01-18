"use strict";

import Data      from "models/Data";
import Patient   from "models/Patient";
import create    from "helpers/create";
import amd_stats from "helpers/amd_stats_datas";

export default class Folder extends Data {
  getModel() {
    return "Folder";
  }

  constructor(data) {
    super(data);
    this.mainFile = (this.mainFile ? new Patient(this.mainFile) : new Patient());
    this.subFiles = this.subFiles || [];
    this.id = this.id || -1;
    for(var i = 0; i < this.subFiles.length; i++) {
      this.subFiles[i] = create(this.subFiles[i]._type, this.subFiles[i], this);
      this.subFiles[i].linkPatient(this.getMainFile());
    }
    this.subFiles.sort(Folder.ordering);
  }

  getId() {
    if (this.isSet("id")) {
      return this.id;
    }
    return -1;
  }

  getMainFile() {
    if (this.isSet("mainFile")) {
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

  graphic_dimensions(axis_x, axis_y) {
    return amd_stats.dimensions[axis_x + "_" + axis_y + "_" + this.getMainFile().sexStr()];
  }

  static ordering(o1, o2) {
    var o1First = -1;
    var o2First = 1;
    // Return 1 if o1 > o2 (o1 - o2) (o1 est apr�s o2)
    // Return -1 if o1 < o2 (o1 - o2) (o1 est avant o2)

    // What to do if one 'id' is missing
    if (typeof(o1.id) == "undefined") {
      if (typeof(o2.id) != "undefined") {
        return o1First;
      }
    } else {
      if (typeof(o2.id) == "undefined") {
        return o2First;
      }
    }

    // What to do if one 'type' is missing
    if (typeof(o1.getModel()) == "undefined") {
      if (typeof(o2.getModel()) != "undefined") return o1First;
    } else {
      if (typeof(o2.getModel()) == "undefined") return o2First;
    }

    // What to do if one 'Date' is missing
    if (typeof(o1.Date) == "undefined") {
      if (typeof(o2.Date) != "undefined") return o1First;
    } else {
      if (typeof(o2.Date) == "undefined") return o2First;
    }

    // Both 'date' are present
    if (typeof(o1.Date) != "undefined" && typeof(o2.Date) != "undefined") {
      if (o1.Date < o2.Date) return o2First;
      if (o1.Date > o2.Date) return o1First;
    }

    // Both 'type' are present
    if (typeof(o1.getModel()) != "undefined" && typeof(o2.getModel()) != "undefined") {
      if (o1.getModel() < o2.getModel()) return o1First;
      if (o1.getModel() > o2.getModel()) return o2First;
    }

    // Both 'id' are present
    if (typeof(o1.id) != "undefined" && typeof(o2id) != "undefined") {
      if (o1.id > o2.id) return o1First;
      if (o1.id < o2.id) return o2First;
    }
    return 0;
  }
}
