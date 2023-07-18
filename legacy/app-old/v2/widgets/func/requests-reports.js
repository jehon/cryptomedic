/**
 * @param {string} reportId name
 * @param {object} data describing the search
 * @returns {object} options for request (see XRequestor#request)
 */
export function reportQueryBuilder(reportId, data) {
  return {
    url: "reports/" + reportId,
    data
  };
}
