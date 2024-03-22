export const LOGINS = {
  PHYSIO: "murshed",
  RO: "readonly",
  ADMIN: "jehon"
};

export const PASSWORD = "p";

export function crUrl(segment: string = ""): string {
  return `http://localhost:8085/built/frontend-ng/${segment}`;
}
