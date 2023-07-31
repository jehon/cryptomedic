/* istanbul ignore file */

import PatientRelated from "./PatientRelated.js";

export default class Appointment extends PatientRelated {
  getModel() {
    return "Appointment";
  }

  constructor(data, folder = null) {
    super(data, folder);
    if (!data) {
      var now = new Date();
      var year = now.getFullYear();
      var month = "0" + (now.getMonth() + 1);
      month = month.substring(month.length - 2);
      var day = "0" + now.getDate();
      day = day.substring(day.length - 2);

      this.date = year + "-" + month + "-" + day;
    }
  }

  isLocked() {
    return false;
  }
}
