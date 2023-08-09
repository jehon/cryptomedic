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
    patient: "/static/img/model_patient.gif",
    picture: "/static/img/model_picture.svg"
  }
};
