import React from "react";
import { Optional } from "../utils/generic-types";
import IOAbstract, { IOProps } from "./io-abstract";

export default function IOString(props: IOProps<Optional<string>>) {
  return IOAbstract(props, {
    renderOutput: (value) => <div>{value}</div>,
    renderInput: (uuid: string, value) => (
      <input
        id={uuid}
        className="form-control"
        name={props.name}
        defaultValue={value ?? ""}
        onBlur={(evt) => props.onChange && props.onChange(evt.target.value)}
      />
    )
  });
}
