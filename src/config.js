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
    appointment: "/static/img/model_appointment.gif",
    bill: "/static/img/model_bill.svg",
    consult_clubfoot: "/static/img/error.svg",
    consult_other: "/static/img/error.svg",
    consult_ricket: "/static/img/error.svg",
    patient: "/static/img/model_patient.gif",
    picture: "/static/img/model_picture.svg",
    surgery: "/static/img/model_surgery.png"
  }
};
