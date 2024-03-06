import { IOParams } from "./io-abstract";
import IOString from "./io-string";
import { Optional } from "../utils/generic-types";

export default function IOList(
  options: { list?: string[] } & IOParams<Optional<string>>
) {
  return IOString(options);
}
