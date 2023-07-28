import { RequestCRUD } from "./x-requestor.js";

/**
 * @param {number} entry_year to be checked
 * @param {number} entry_order to be checked
 * @returns {object} options for request (see XRequestor#request)
 */
export function checkReferenceBuilder(entry_year, entry_order) {
  return {
    url: "reference/" + entry_year + "/" + entry_order
  };
}

/**
 * @param {number} entry_year to be checked
 * @param {number} entry_order to be checked
 * @returns {object} options for request (see XRequestor#request)
 */
export function createReferenceBuilder(entry_year, entry_order) {
  return {
    method: "POST",
    url: "reference",
    data: {
      entry_year,
      entry_order
    }
  };
}

/**
 * @param {object} data describing the search
 * @returns {object} options for request (see XRequestor#request)
 */
export function patientSearchBuilder(data) {
  return {
    url: "folder",
    data
  };
}

//
//
// Cruds
//
//

// /**
//  * @returns {RequestCRUD} for element
//  */
//  export function patientsCrud() {
//     return new RequestCRUD('fiche/patients');
// }

// /**
//  * @returns {RequestCRUD} for element
//  */
// export function appointmentsCrud() {
//     return new RequestCRUD('fiche/appointments');
// }

// /**
//  * @returns {RequestCRUD} for element
//  */
//  export function billsCrud() {
//     return new RequestCRUD('fiche/bills');
// }

// /**
//  * @returns {RequestCRUD} for element
//  */
//  export function clubfeetCrud() {
//     return new RequestCRUD('fiche/clubfeet');
// }

// /**
//  * @returns {RequestCRUD} for element
//  */
//  export function otherconsultsCrud() {
//     return new RequestCRUD('fiche/otherconsults');
// }

/**
 * @returns {RequestCRUD} for element
 */
export function paymentsCrud() {
  return new RequestCRUD("fiche/payments");
}

// /**
//  * @returns {RequestCRUD} for element
//  */
//  export function picturesCrud() {
//     return new RequestCRUD('fiche/pictures');
// }

// /**
//  * @returns {RequestCRUD} for element
//  */
//  export function ricketconsultsCrud() {
//     return new RequestCRUD('fiche/ricketconsults');
// }

// /**
//  * @returns {RequestCRUD} for element
//  */
//  export function surgeriesCrud() {
//     return new RequestCRUD('fiche/surgeries');
// }
