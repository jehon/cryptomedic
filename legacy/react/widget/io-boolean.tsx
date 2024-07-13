import { Optional } from "../utils/generic-types";
import { ImgBooleanFalse, ImgBooleanTrue } from "./images";
import IOAbstract, { IOParams } from "./io-abstract";
import { buildRadios } from "./io-list";

export type StringBoolean = string | number;

export default function IOBoolean(
  options: IOParams<Optional<StringBoolean | boolean>>
) {
  return IOAbstract(options, {
    renderOutput: (value) => (value ? ImgBooleanTrue() : ImgBooleanFalse()),
    renderInput: (uuid: string, value) =>
      buildRadios(
        uuid,
        {
          Yes: "1",
          No: "0"
        },
        value == undefined ? "" : value ? "1" : "0",
        options.name ?? "",
        options.onChange
      )
  });
}
