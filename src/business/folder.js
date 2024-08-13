import Pojo from "./abstracts/pojo.js";
import Appointment from "./appointment.js";
import Patient from "./patient.js";

// Enrich the registry:
import { produce } from "immer";
import "./bill.js";
import "./consult-clubfoot.js";
import "./consult-other.js";
import "./consult-ricket.js";
import "./payment.js";
import "./picture.js";
import { registryGet } from "./registry.js";
import "./surgery.js";

export default class Folder extends Pojo {
  static create(folder, type, data = {}) {
    return new (registryGet(type))(data, folder);
  }

  /** @type {Array<PatientRelated|Patient>} */
  list;

  constructor(listing = {}) {
    super();
    this.list = [];

    // create the objects
    for (let i in listing) {
      let v = listing[i];
      this.list.push(Folder.create(this, v.type, v.record));
    }
  }

  /**
   *
   * @param {Pojo} file
   * @returns {Folder}
   */
  withFile(file) {
    //
    // We remove and add in one run
    // to avoid building twice the folder
    //
    return produce(this.withoutFile(file.uid()), (draft) => {
      draft.list.push(file);
    });
  }

  /**
   *
   * @param {string} uid
   * @returns {Folder}
   */
  withoutFile(uid) {
    const i = this.list.findIndex((val) => val.uid() === uid);
    if (i < 0) {
      return this;
    }

    return produce(this, (draft) => {
      draft.list.splice(i, 1);
    });
  }

  getId() {
    const patient = this.getPatient();
    if (patient.id) {
      return patient.id + "";
    }
    return -1;
  }

  // Legacy
  getListByType(type) {
    console.assert(
      type instanceof Function,
      "getListByType[type/1] expect a class"
    );
    let res = [];
    for (let i in this.list) {
      if (this.list[i] instanceof type) {
        res.push(this.list[i]);
      }
    }
    return res;
  }

  // Legacy
  /**
   *
   * @returns {PatientRelated|null}
   */
  getByTypeAndId(type, id) {
    const list = this.getListByType(type);
    for (const i in list) {
      if (list[i].id + "" === id + "") {
        return list[i];
      }
    }
    return null;
  }

  // Legacy
  /**
   *
   * @param {string} uid - see Pojo#uid
   * @returns {PatientRelated|null} a file or null
   */
  getByUid(uid) {
    if (uid === "Patient") {
      return this.getPatient();
    }
    for (const i in this.list) {
      if (this.list[i].uid && this.list[i].uid() === uid) {
        return this.list[i];
      }
    }
    return null;
  }

  getByFieldValue(field, value) {
    let res = [];
    for (let i in this.list) {
      if (this.list[i][field] == value) {
        res.push(this.list[i]);
      }
    }
    return res;
  }

  // Legacy
  /**
   *
   * @returns {Patient}
   */
  getPatient() {
    let list = this.getListByType(Patient);
    if (list.length === 0) {
      // Always have a patient
      let p = new Patient();
      this.list.push(p);
      return p;
    }
    return list[0];
  }

  /**
   *
   * @returns {Array<PatientRelated>} file
   */
  getFilesRelatedToPatient() {
    if (!this.getPatient().id) {
      return [];
    }
    return this.getByFieldValue("patient_id", this.getPatient().id).sort(
      Folder.ordering
    );
  }

  // Legacy
  /**
   *
   * @param {number} i is the index of the file
   * @returns {PatientRelated|null} file
   */
  getFileRelatedToPatient(i) {
    let list = this.getFilesRelatedToPatient();
    if (list.length > i) {
      return list[i];
    }
    return null;
  }

  // Legacy
  /**
   *
   * @returns {Array<Payment>}
   */
  getFilesRelatedToBill(id) {
    return this.getByFieldValue("bill_id", id).sort(Folder.ordering);
  }

  /**
   * Search the next but closest apointment
   *
   * @returns {Date|null}
   */
  getNextAppoinment() {
    const today = new Date();
    return this.getListByType(Appointment)
      .map((v) => v.date)
      .map((d) => new Date(d))
      .filter((d) => d > today)
      .reduce((prev, d) => (!prev || d < prev ? d : prev), null);
  }

  /**
   * Search the next but closest apointment
   *
   * @returns {Date|null}
   */
  getLastSeen() {
    const today = new Date();
    return (
      this.list
        // We take everything except Appointment
        .filter((v) => !(v instanceof Appointment))
        .map((v) => v.date)
        .filter((d) => d)
        .map((d) => new Date(d))
        .filter((d) => d < today)
        .reduce((last, d) => (!last || d > last ? d : last), null)
    );
  }

  static ordering(o1, o2) {
    const o1First = -1;
    const o2First = 1;

    const o1id = parseInt(o1.id);
    const o2id = parseInt(o2.id);

    // Return 1 if o1 > o2 (o1 - o2) (o1 est après o2)
    // Return -1 if o1 < o2 (o1 - o2) (o1 est avant o2)

    // What to do if one 'id' is missing
    if (isNaN(o1id) && !isNaN(o2id)) {
      return 10 * o1First;
    }
    if (isNaN(o2id) && !isNaN(o1id)) {
      return 10 * o2First;
    }

    // What to do if one 'date' is missing
    if (typeof o1.date == "undefined" && typeof o2.date != "undefined") {
      return 20 * o1First;
    }
    if (typeof o2.date == "undefined" && typeof o1.date != "undefined") {
      return 20 * o2First;
    }

    // Both 'date' are present
    if (typeof o1.date != "undefined" && typeof o2.date != "undefined") {
      if (o1.date < o2.date) return 30 * o2First;
      if (o1.date > o2.date) return 30 * o1First;
    }

    if (
      typeof o1.created_at != "undefined" &&
      typeof o2.created_at != "undefined"
    ) {
      if (o1.created_at < o2.created_at) return 40 * o2First;
      if (o1.created_at > o2.created_at) return 40 * o1First;
    }

    // Both 'id' are present
    if (!isNaN(o1id) && !isNaN(o2id)) {
      if (o1id > o2id) return 50 * o1First;
      if (o1id < o2id) return 50 * o2First;
    }

    // Both 'type' are present
    if (o1.getStatic().getModel() < o2.getStatic().getModel())
      return 40 * o1First;
    if (o1.getStatic().getModel() > o2.getStatic().getModel())
      return 40 * o2First;

    return 0;
  }
}
