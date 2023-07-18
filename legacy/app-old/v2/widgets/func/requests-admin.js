import { RequestCRUD } from "./x-requestor.js";

/**
 * @returns {RequestCRUD} for prices
 */
export function pricesCrud() {
  return new RequestCRUD("admin/prices");
}

/**
 * Build up a users crud
 *
 * @returns {object} with the various commands
 */
export function usersCrud() {
  const crud = new RequestCRUD("users");

  /**
   * @param {number} uid of the user
   * @param {string} password to be set
   * @returns {object} options for request (see XRequestor#request)
   */
  crud["updatePassword"] = (uid, password) => ({
    url: `users/password/${uid}`,
    method: "POST",
    data: { password }
  });

  return crud;
}
