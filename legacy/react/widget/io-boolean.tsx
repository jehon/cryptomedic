import IOAbstract, { IOParams } from "./io-abstract";
import { Optional } from "../utils/generic-types";
import { ImgBooleanFalse, ImgBooleanTrue } from "./images";

export default function IOBoolean(props: IOParams<Optional<boolean>>) {
  return IOAbstract<Optional<boolean>>(props, {
    renderOutput: (value) => (value ? ImgBooleanTrue() : ImgBooleanFalse())
  });
}
