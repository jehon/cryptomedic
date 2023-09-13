// Also adapt package.json for adding testing the new api
// See md5sum.php to protect old versions... and delete them when necessary !!!
export const spacing = {
  /**
   * between the elements
   *
   * @type {string}
   */
  element: "5px",

  /**
   * between the container and the text
   *
   * @type {string}
   */
  text: "5px"
};

const nbrOr = (1 + Math.sqrt(5)) / 2;
export const orSmall = (1 / (1 + nbrOr)) * 100;
export const orBig = 100 - orSmall;

export const messages = {
  success: "success",
  info: "info",
  warning: "warning",
  error: "error"
};

export const icons = {
  error: "/static/img/error.svg",
  logout: "/static/img/logout.gif",
  models: {
    Appointment: "/static/img/model_appointment.gif",
    Bill: "/static/img/model_bill.svg",
    ClubFoot: "/static/img/model_consult_clubfoot.svg",
    OtherConsult: "/static/img/model_consult_other.svg",
    RicketConsult: "/static/img/model_consult_ricket.svg",
    Patient: "/static/img/model_patient.gif",
    Payment: "/static/img/payment.gif",
    Picture: "/static/img/model_picture.svg",
    Surgery: "/static/img/model_surgery.png"
  }
};
