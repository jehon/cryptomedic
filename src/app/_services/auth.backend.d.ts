import Price from "../patients/business/price";

export default interface BackendAuthInterface {
  username: string;
  group: string;
  name: string;
  email: string;
  prices: Map<string, Price>;
  lists: Map<string, (string | number)[]>;
  codes: Map<string, string>;
  associations: Map<string, string[]>;
  authorized: string[];
  supported: string;
}
