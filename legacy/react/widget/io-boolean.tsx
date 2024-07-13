import { Optional } from "../utils/generic-types";
import { ImgBooleanFalse, ImgBooleanTrue } from "./images";
import IOAbstract, { IOProps } from "./io-abstract";
import { buildRadios } from "./io-list";

export type StringBoolean = string | number;

export default function IOBoolean(
  props: IOProps<Optional<StringBoolean | boolean>>
) {
  return IOAbstract(props, {
    renderOutput: (value) => (value ? ImgBooleanTrue() : ImgBooleanFalse()),
    renderInput: (uuid: string, value) =>
      buildRadios(
        uuid,
        {
          Yes: "1",
          No: "0"
        },
        value == undefined ? "" : value ? "1" : "0",
        props.name ?? "",
        props.onChange
      )
  });
}
