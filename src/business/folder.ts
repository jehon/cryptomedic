import FolderPage from "./folderPage";
import Patient from "./patient";
import Appointment from "./appointment";
import Bill from "./bill";
import ClubFoot from "./clubFoot";
import OtherConsult from "./otherConsult";
import Payment from "./payment";
import Picture from "./picture";
import RicketConsult from "./ricketConsult";
import Surgery from "./surgery";

export default class Folder extends FolderPage {
  static string2class(type: string): typeof FolderPage {
    switch (type) {
      case "Patient":
        return Patient;
      case "Appointment":
        return Appointment;
      case "Bill":
        return Bill;
      case "ClubFoot":
        return ClubFoot;
      case "OtherConsult":
        return OtherConsult;
      case "Payment":
        return Payment;
      case "Picture":
        return Picture;
      case "RicketConsult":
        return RicketConsult;
      case "Surgery":
        return Surgery;
    }
    throw Error(`Type not found: ${type}`);
  }

  // static create(folder, type, data = {}) {
  //   return new (this.string2class(type))(data, folder);
  // }

  // constructor(listing = {}) {
  //   super();
  //   this.headers = {};
  //   this.list = [];

  //   // create the objects
  //   for (let i in listing) {
  //     let v = listing[i];
  //     this.list.push(Folder.create(this, v.type, v.record));
  //   }

  //   this.getFilesRelatedToPatient().forEach((f) => {
  //     f.linkPatient(this.getPatient());
  //   });
  // }

  // getId() {
  //   const patient = this.getPatient();
  //   if ("id" in patient) {
  //     return patient.id + "";
  //   }
  //   return -1;
  // }

  getListByType(type: typeof FolderPage) {
    let res = [];
    for (let i in this.list) {
      if (this.list[i] instanceof type) {
        res.push(this.list[i]);
      }
    }
    return res;
  }

  // getByTypeAndId(type, id) {
  //   const list = this.getListByType(type);
  //   for (const i in list) {
  //     if (list[i].id + "" == id + "") {
  //       return list[i];
  //     }
  //   }
  //   return null;
  // }

  // /**
  //  *
  //  * @param {string} uid - see FolderPage#uid
  //  * @returns {*} a file or null
  //  */
  // getByUid(uid) {
  //   if (uid == "patient") {
  //     return this.getPatient();
  //   }
  //   for (const i in this.list) {
  //     if (this.list[i].uid && this.list[i].uid() == uid) {
  //       return this.list[i];
  //     }
  //   }
  //   return null;
  // }

  getByFieldValue(field: string, value: any) {
    let res = [];
    for (let i in this.list) {
      if (this.list[i][field] === value) {
        res.push(this.list[i]);
      }
    }
    return res;
  }

  get patient() {
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
   * @param {boolean|number} i is the index of the file
   * @returns {object} file
   */
  getFilesRelatedToPatient(i = false): FolderPage[] | null {
    if (i !== false) {
      let list = this.getFilesRelatedToPatient();
      if (list.length > i) {
        return list[i];
      }
      return null;
    }
    if (!("id" in this.patient)) {
      return [];
    }
    return this.getByFieldValue("patient_id", this.patient.id).sort(
      Folder.ordering
    );
  }

  // getFilesRelatedToBill(id) {
  //   return this.getByFieldValue("bill_id", id).sort(Folder.ordering);
  // }

  // setHeader(key, value) {
  //   this.headers[key] = value;
  // }

  // getHeader(key) {
  //   return this.headers[key];
  // }

  static ordering(o1: FolderPage, o2: FolderPage): number {
    const o1First = -1;
    const o2First = 1;

    const o1id = o1.id;
    const o2id = o2.id;

    // Return 1 if o1 > o2 (o1 - o2) (o1 est apr�s o2)
    // Return -1 if o1 < o2 (o1 - o2) (o1 est avant o2)

    // What to do if one 'id' is missing
    if (isNaN(o1id) && !isNaN(o2id)) {
      return 10 * o1First;
    }
    if (isNaN(o2id) && !isNaN(o1id)) {
      return 10 * o2First;
    }

    // What to do if one 'Date' is missing
    if (typeof o1.Date == "undefined" && typeof o2.Date != "undefined") {
      return 20 * o1First;
    }
    if (typeof o2.Date == "undefined" && typeof o1.Date != "undefined") {
      return 20 * o2First;
    }

    // Both 'date' are present
    if (typeof o1.Date != "undefined" && typeof o2.Date != "undefined") {
      if (o1.Date < o2.Date) return 30 * o2First;
      if (o1.Date > o2.Date) return 30 * o1First;
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
    if (o1.getModel() < o2.getModel()) return 40 * o1First;
    if (o1.getModel() > o2.getModel()) return 40 * o2First;

    return 0;
  }
}
