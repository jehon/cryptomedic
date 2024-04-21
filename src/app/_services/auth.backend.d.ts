import Price from "../patients/business/price";

export default interface BackendAuthInterface {
  username: string;
  group: string;
  name: string;
  email: string;
  prices: Record<string, Price>;
  lists: Record<string, (string | number)[]>;
  codes: Record<string, string>;
  associations: Record<string, string[]>;
  authorized: string[];
  supported: string;
}
