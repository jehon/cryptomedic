import React from "react";
import { Optional } from "../utils/generic-types";
import IOAbstract, { IOParams } from "./io-abstract";

export default function IOString(options: IOParams<Optional<string>>) {
  return IOAbstract(options, {
    renderOutput: (value) => <div>{value}</div>,
    renderInput: (uuid: string, value) => (
      <input
        id={uuid}
        className="form-control"
        name={options.name}
        defaultValue={value ?? ""}
        onBlur={(evt) => options.onChange && options.onChange(evt.target.value)}
      />
    )
  });
}
