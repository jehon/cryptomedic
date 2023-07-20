import FolderPage from "./folderPage";
// import { DataMissingException } from "../js/exceptions.js";

export default class PatientRelated extends FolderPage {
  // constructor(data, folder = null) {
  //   super(data);
  //   if (folder) {
  //     this.patient_id = folder.getId();
  //     this.linkPatient(folder.getPatient());
  //   } else {
  //     this.linkPatient(null);
  //   }
  // }
  // linkPatient(patient) {
  //   // Encapsulate into function, so that it is not persisted
  //   this.getPatient = function () {
  //     return patient;
  //   };
  //   if (patient) {
  //     this.patient_id = patient.id;
  //   }
  // }
  // wh() {
  //   if (!this.isNotZero("Heightcm")) {
  //     throw new DataMissingException("Height");
  //   }
  //   if (!this.isNotZero("Weightkg")) {
  //     throw new DataMissingException("Weight");
  //   }
  //   return this.Weightkg / this.Heightcm;
  // }
  // bmi() {
  //   if (!this.isNotZero("Heightcm")) {
  //     throw new DataMissingException("Height");
  //   }
  //   if (!this.isNotZero("Weightkg")) {
  //     throw new DataMissingException("Weight");
  //   }
  //   return (10000 * this.Weightkg) / (this.Heightcm * this.Heightcm);
  // }
  // isLocked() {
  //   if (!this.updated_at) {
  //     return false;
  //   }
  //   var dlock = new Date(this.updated_at);
  //   dlock.setDate(dlock.getDate() + 35);
  //   return dlock < new Date();
  // }
}
