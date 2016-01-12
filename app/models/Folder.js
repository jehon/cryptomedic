"use strict";

import Data      from "models/Data";
import Patient   from "models/Patient";

export default class Folder extends Data {
  load(data) {
    this._super(data);
    this.setPatients();
  }
  setPatients() {
    this.mainFile = this.mainFile || new Patient();
    this.subFiles = this.subFiles || [];
    for(var i = 0; i < this.subFiles.length; i++) {
      this.subFiles[i].setPatient(this.getMainFile());
    }
    this.subFiles.sort(this.ordering);
  }

  getId() {
    return this.id;
  }

  getSubFiles() {
    return this.subFiles;
  }

  getSubFile(i) {
    if (i >= this.subFiles.length) return null;
    return this.subFiles[i];
  }

  getMainFile() {
    return this.mainFile;
  }

  static ordering(o1, o2) {
    var o1First = -1;
    var o2First = 1;
    // Return 1 if o1 > o2 (o1 - o2) (o1 est apr�s o2)
    // Return -1 if o1 < o2 (o1 - o2) (o1 est avant o2)

    // What to do if one 'id' is missing
    if (typeof(o1["id"]) == "undefined") {
      if (typeof(o2["id"]) != "undefined") {
        return o1First;
      }
    } else {
      if (typeof(o2["id"]) == "undefined") {
        return o2First;
      }
    }

    // What to do if one 'type' is missing
    if (typeof(o1["_type"]) == "undefined") {
      if (typeof(o2["_type"]) != "undefined") return o1First;
    } else {
      if (typeof(o2["_type"]) == "undefined") return o2First;
    }

    // What to do if one 'Date' is missing
    if (typeof(o1["Date"]) == "undefined") {
      if (typeof(o2["Date"]) != "undefined") return o1First;
    } else {
      if (typeof(o2["Date"]) == "undefined") return o2First;
    }

    // Both 'date' are present
    if (typeof(o1["Date"]) != "undefined" && typeof(o2["Date"]) != "undefined") {
      if (o1["Date"] < o2["Date"]) return o2First;
      if (o1["Date"] > o2["Date"]) return o1First;
    }

    // Both 'type' are present
    if (typeof(o1["_type"]) != "undefined" && typeof(o2["_type"]) != "undefined") {
      if (o1["_type"] < o2["_type"]) return o1First;
      if (o1["_type"] > o2["_type"]) return o2First;
    }

    // Both 'id' are present
    if (typeof(o1["id"]) != "undefined" && typeof(o2["id"]) != "undefined") {
      if (o1["id"] > o2["id"]) return o1First;
      if (o1["id"] < o2["id"]) return o2First;
    }
    return 0;
  }
}
