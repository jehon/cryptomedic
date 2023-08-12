import PatientRelated from "./patient-related.js";

export default class Appointment extends PatientRelated {
  getModel() {
    return "Appointment";
  }

  date;
  examiner;
  purpose;
  next_appointment;
  next_center;

  constructor(
    { date, examiner, purpose, next_appointment, next_center, ...others } = {},
    folder = null
  ) {
    super(others, folder);
    this.date = date;
    this.examiner = examiner;
    this.purpose = purpose;
    this.next_appointment = next_appointment;
    this.next_center = next_center;

    if (!this.date) {
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
