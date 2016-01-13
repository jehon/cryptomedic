"use strict";

import Data from "models/Data";
import date2CanonicString from "helpers/date2CanonicString";
import amd_stats from "helpers/amd_stats_datas";

export default class File extends Data{
  constructor(data, folder = null) {
    super(data);
    if (data == null) {
      var c = service_session_storage();
      this.ExaminerName = c.get("examinerName", "");
      this.Center = c.get("center", "Chakaria Disability Center");
      this.Date = c.get("date", null);
      if (this.Date == null) {
        this.Date = date2CanonicString(new Date(), true);
      }
    }
    if (folder) {
      this.patient_id = folder.getId();
      this.linkPatient(folder.getMainFile());
    } else {
      this.linkPatient(null);
    }
  }

  linkPatient(patient) {
    // Encapsulate into function, so that it is not persisted
    this.getPatient = function() {
      return patient;
    };
  }

  // For graphic, by default it expect number -> textual render it in text only on demand
  ageAtConsultTime(textual) {
    if (!this.isSet("Date")) {
      throw new DataMissingException("Date");
    }
    var age = calculations.age.fromBirthDate(this.getPatient().Yearofbirth, { reference: this.Date, format: (textual ? false : "number") });
    // if (age == "?") throw new DataMissingException("Date");
    return age;
  }

  ds_height() {
    var sex = this.getPatient().sexStr();
    if (!sex) {
      throw new DataMissingException("sex");
    }
    var age = this.ageAtConsultTime();
    if (typeof(age) != "number") {
      throw new DataMissingException("Age");
    }
    if (!this.isNotZero("Heightcm")) {
      throw new DataMissingException("Height");
    }
    return calculations.math.stdDeviation(amd_stats[sex]["Heightcm"], age, this.Heightcm);
  }

  ds_weight() {
    var sex = this.getPatient().sexStr();
    if (!sex) {
      throw new DataMissingException("sex");
    }
    var age = this.ageAtConsultTime();
    if (typeof(age) != "number") {
      throw new DataMissingException("Age");
    }
    if (!this.isNotZero("Weightkg")) {
      throw new DataMissingException("Weight");
    }
    return calculations.math.stdDeviation(amd_stats[sex]["Weightkg"], age, this.Weightkg);
  }

  wh() {
    if (!this.isNotZero("Heightcm")) {
      throw new DataMissingException("Height");
    }
    if (!this.isNotZero("Weightkg")) {
      throw new DataMissingException("Weight");
    }
    return this.Weightkg/this.Heightcm;
  }

  ds_weight_height() {
    var sex = this.getPatient().sexStr();
    if (!sex) {
      throw new DataMissingException("sex");
    }
    if (!this.isNotZero("Heightcm")) {
      throw new DataMissingException("Height");
    }
    if (!this.isNotZero("Weightkg")) {
      throw new DataMissingException("Weight");
    }
    return calculations.math.stdDeviation(amd_stats[sex]["wh"], this.Heightcm, this.Weightkg);
  }

  bmi() {
    if (!this.isNotZero("Heightcm")) {
      throw new DataMissingException("Height");
    }
    if (!this.isNotZero("Weightkg")) {
      throw new DataMissingException("Weight");
    }
    return 10000 * this.Weightkg / (this.Heightcm * this.Heightcm);
  }

  ds_bmi() {
    var sex = this.getPatient().sexStr();
    if (!sex) {
      throw new DataMissingException("sex");
    }
    var age = this.ageAtConsultTime();
    if (typeof(age) != "number") {
      throw new DataMissingException("Age");
    }
    return calculations.math.stdDeviation(amd_stats[sex]["bmi"], age, this.bmi());
  }

  isLocked() {
    if (!this.updated_at) {
      return false;
    }
    var dlock = new Date(this.updated_at);
    dlock.setDate(dlock.getDate() + 35);
    return (dlock < new Date());
  }
}
