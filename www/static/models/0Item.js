'use strict';
/* global Data, getPref, DataMissingException, calculations, amd_stats */
/* exported Item */

class Item extends Data {
  constructor(data, folder = null) {
    super(data);
    if (data == null) {
      var c = getPref('file', {
        examinerName: '',
        center: '',
        date: ''
      });
      this.ExaminerName = c.examinerName;
      this.Center       = c.center;
      this.Date         = c.date;
    }
    if (folder) {
      this.patient_id = folder.getId();
      this.linkPatient(folder.getMainFile());
    } else {
      this.linkPatient(null);
    }
  }

  getModel() {
    throw "You should define the getModel on each model";
  }

  getRelated() {
    return {};
  }

  linkPatient(patient) {
    // Encapsulate into function, so that it is not persisted
    this.getPatient = function() {
      return patient;
    };
  }

  // For graphic, by default it expect number -> textual render it in text only on demand
  ageAtConsultTime(textual) {
    if (!this.isSet('Date')) {
      throw new DataMissingException('Date');
    }
    var age = calculations.age.fromBirthDate(this.getPatient().Yearofbirth, { reference: this.Date, format: (textual ? false : 'number') });
    // if (age == '?') throw new DataMissingException('Date');
    return age;
  }

  ds_height() {
    var sex = this.getPatient().sexStr();
    if (!sex) {
      throw new DataMissingException('sex');
    }
    var age = this.ageAtConsultTime();
    if (typeof(age) != 'number') {
      throw new DataMissingException('Age');
    }
    if (!this.isNotZero('Heightcm')) {
      throw new DataMissingException('Height');
    }
    return calculations.math.stdDeviation(amd_stats[sex]['Heightcm'], age, this.Heightcm);
  }

  ds_weight() {
    var sex = this.getPatient().sexStr();
    if (!sex) {
      throw new DataMissingException('sex');
    }
    var age = this.ageAtConsultTime();
    if (typeof(age) != 'number') {
      throw new DataMissingException('Age');
    }
    if (!this.isNotZero('Weightkg')) {
      throw new DataMissingException('Weight');
    }
    return calculations.math.stdDeviation(amd_stats[sex]['Weightkg'], age, this.Weightkg);
  }

  wh() {
    if (!this.isNotZero('Heightcm')) {
      throw new DataMissingException('Height');
    }
    if (!this.isNotZero('Weightkg')) {
      throw new DataMissingException('Weight');
    }
    return this.Weightkg/this.Heightcm;
  }

  ds_weight_height() {
    var sex = this.getPatient().sexStr();
    if (!sex) {
      throw new DataMissingException('sex');
    }
    if (!this.isNotZero('Heightcm')) {
      throw new DataMissingException('Height');
    }
    if (!this.isNotZero('Weightkg')) {
      throw new DataMissingException('Weight');
    }
    return calculations.math.stdDeviation(amd_stats[sex]['wh'], this.Heightcm, this.Weightkg);
  }

  bmi() {
    if (!this.isNotZero('Heightcm')) {
      throw new DataMissingException('Height');
    }
    if (!this.isNotZero('Weightkg')) {
      throw new DataMissingException('Weight');
    }
    return 10000 * this.Weightkg / (this.Heightcm * this.Heightcm);
  }

  ds_bmi() {
    var sex = this.getPatient().sexStr();
    if (!sex) {
      throw new DataMissingException('sex');
    }
    var age = this.ageAtConsultTime();
    if (typeof(age) != 'number') {
      throw new DataMissingException('Age');
    }
    return calculations.math.stdDeviation(amd_stats[sex]['bmi'], age, this.bmi());
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
