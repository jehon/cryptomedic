import { getBrowserDescription } from "../../js/browser.js";
import { requestAndFilterBuilder } from "./x-requestor.js";

/**
 * Build object for XRequestor#request
 *
 * @param {string} username of the request
 * @param {string} password of the request
 * @returns {object} options for request (see XRequestor#request)
 */
export function loginRequestBuilder(username, password) {
  return requestAndFilterBuilder(
    {
      url: "auth/mylogin",
      method: "POST",
      data: { username, password, browser: getBrowserDescription() }
    },
    [404]
  );
}

/**
 * Build object for XRequestor#request
 *
 * @returns {object} options for request (see XRequestor#request)
 */
export function loginCheckRequestBuilder() {
  return requestAndFilterBuilder(
    {
      url: "auth/settings",
      method: "GET",
      data: { browser: getBrowserDescription() }
    },
    [401]
  );
}

/**
 * Build object for XRequestor#request
 *
 * @returns {object} options for request (see XRequestor#request)
 */
export function logoutBuilder() {
  return {
    url: "/api/auth/logout"
  };
}
