// Context
export const e2eBackendHost = `http://${process.env["CRYPTOMEDIC_DEV_HTTP_HOST"] ?? "localhost"}:${process.env["CRYPTOMEDIC_DEV_HTTP_PORT"] ?? 8085}`;

// Test data
export const e2eInputTimeoutMs = 1000;
export const e2eWaitForPathChangeMs = 5 * 1000;

// Business data
export const e2eUsers = {
  PHYSIO: "murshed",
  RO: "readonly",
  ADMIN: "jehon"
};
export const e2eUsersPassword = "p";
export const e2eDefaultYear = 2018;
