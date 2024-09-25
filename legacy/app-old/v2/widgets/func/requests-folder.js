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
