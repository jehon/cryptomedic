import { Page } from "playwright-core";
import { LOGINS, crInit } from "../helpers/cr";

export { crInit } from "../helpers/cr";

export function crInitPatient(
  page: Page,
  segment: string,
  { login = LOGINS.PHYSIO }: { login?: string } = {}
) {
  return crInit(page, { page: segment, login: login });
}
