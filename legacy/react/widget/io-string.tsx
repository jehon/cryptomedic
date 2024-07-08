import React from "react";
import { Optional } from "../utils/generic-types";
import IOAbstract, { IOParams } from "./io-abstract";

export default function IOString(options: IOParams<Optional<string>>) {
  return IOAbstract<Optional<string>>(options, {
    renderOutput: (value) => <div>{value}</div>,
    renderInput: (value: Optional<string>) => (
      <input
        className="form-control"
        name={options.name}
        defaultValue={value ?? ""}
      />
    )
  });
}
