/**
 * Make an api call
 *
 * @param {object} options
 * @property {string} url of the call (relative to version if relative)
 * @property {string?} method of the call
 * @returns {Cypress.Chainable<*>} Cypress chain to the results of the request
 * @see https://docs.cypress.io/api/commands/request
 */
function crApi(options = {}) {
  return cy
    .request({
      ...options,
      url: options.url[0] == "/" ? options.url : `/api/${options.url}`
    })
    .then((response) => response.body);
}

/**
 * Login using api
 *   and wait for "crReady"
 *
 * Please use crLogin.* constants for username
 *
 * @param {string} [username]
 * @param {string} [password]
 * @returns {string} the real user used
 */
export function crApiLogin(username = null, password = null) {
  const realUser = username ?? "murshed";
  const realPassword = password ?? "p";

  crApi({
    url: "auth/mylogin",
    method: "POST",
    body: {
      username: realUser,
      password: realPassword
    }
  });

  return realUser;
}
crApiLogin.PHYSIO = "murshed";
crApiLogin.RO = "readonly";
crApiLogin.ADMIN = "jehon";

/**
 * Logout using api
 *
 *   Note that logout is automatically done through login.
 *
 * @returns {Cypress.Chainable<*>} Cypress chain to the results of the request
 */
export function crApiLogout() {
  return crApi({
    url: "auth/logout"
  });
}

/**
 * Get the price list
 *
 * @returns {Cypress.Chainable<*>} Cypress chain to the price list
 */
export function crApiPriceList() {
  return crApi({ url: "admin/prices" });
}

/**
 * Delete a price
 *
 * @param {string} id of the price to be deleted
 * @returns {Cypress.Chainable<*>} Cypress chain to the results of the request
 */
export function crApiPriceDelete(id) {
  return crApi({ url: `admin/prices/${id}`, method: "DELETE" });
}

/**
 * Delete a user by username
 *
 * @param {string} username to be deleted
 * @returns {Cypress.Chainable<*>} Cypress chain to the results of the request
 */
export function crApiUserDelete(username) {
  return crApi({ url: "users" }).then((data) =>
    data
      .filter((l) => l.username == username)
      .map((l) => l.id)
      .forEach((id) => crApi({ url: `users/${id}`, method: "DELETE" }))
  );
}
