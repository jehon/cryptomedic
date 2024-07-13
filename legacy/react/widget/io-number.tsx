import React from "react";
import { Optional } from "../utils/generic-types";
import { roundTo } from "../utils/strings";
import IOAbstract, { IOParams } from "./io-abstract";

function canonize(str: string): Optional<number> {
  const pi = parseInt(str);
  if (isNaN(pi)) return null;
  return pi;
}

export default function IONumber(
  options: {
    precision?: number;
    min?: string | number;
    max?: string | number;
  } & IOParams<Optional<number>>
) {
  return IOAbstract<Optional<number>>(options, {
    renderOutput: (value) => (
      <div>
        {options.precision && value
          ? roundTo(value, options.precision)
          : "" + value}
      </div>
    ),
    renderInput: (uuid: string, value: Optional<number>) => (
      <input
        id={uuid}
        className="form-control"
        name={options.name}
        defaultValue={(value ?? 0) + ""}
        onBlur={(evt) =>
          options.onChange && options.onChange(canonize(evt.target.value))
        }
        type="number"
        min={"" + options.min}
        max={"" + options.max}
      />
    )
  });
}
