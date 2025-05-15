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

export const messages = {
  success: "success",
  info: "info",
  warning: "warning",
  error: "error"
};

export type BusinessType =
  | "appointment"
  | "bill"
  | "consult_clubfoot"
  | "consult_other"
  | "consult_ricket"
  | "patient"
  | "payment"
  | "price"
  | "picture"
  | "surgery"
  //
  // Legacy
  //
  | "pojo";

export const icons = {
  error: "/static/img/error.svg",
  logout: "/static/img/logout.gif",
  models: {
    appointment: "/static/img/model_appointment.gif",
    bill: "/static/img/model_bill.svg",
    consult_clubfoot: "/static/img/model_consult_clubfoot.svg",
    consult_other: "/static/img/model_consult_other.svg",
    consult_ricket: "/static/img/model_consult_ricket.svg",
    patient: "/static/img/model_patient.gif",
    payment: "/static/img/payment.gif",
    picture: "/static/img/model_picture.svg",
    surgery: "/static/img/model_surgery.png"
  }
};

export function isFeatureSwitchEnabled(): boolean {
  try {
    return location.search == "?dev";
  } catch (_e) {
    // Unit Testing
    return true;
  }
}

if (isFeatureSwitchEnabled()) {
  console.warn("In dev mode (inTodoDev in config.ts)");
}

export const REPORT_ACTIVITY = "activity";
export const REPORT_CASH_REGISTER = "cash-register";
export const REPORT_CONSULTATIONS = "consultations";
export const REPORT_FINANCIAL = "financial";
export const REPORT_SURGICAL = "surgical";
export const REPORT_SURGICAL_SUGGESTED = "surgical-suggested";
export const REPORT_STATISTICAL = "statistical";

export function getPriceCategories() {
  return ["consult", "medecine", "other", "workshop", "surgical"];
}

export function type2Title(type: BusinessType) {
  switch (type) {
    case "appointment":
      return "Appointment";
    case "bill":
      return "Bill";
    case "consult_clubfoot":
      return "Consult. Clubfoot";
    case "consult_other":
      return "Consult. Other";
    case "consult_ricket":
      return "Consult. Ricket";
    case "patient":
      return "Patient";
    case "payment":
      return "Payment";
    case "picture":
      return "Picture";
    case "price":
      return "Price";
    case "surgery":
      return "Surgery";
    default:
      throw new Error(`Unknown type ${type} in type2Title`);
  }
}
