import React from "react";
import { date2HumanString, normalizeDate } from "../utils/date";
import { Optional } from "../utils/generic-types";
import { StringDate } from "../utils/types";
import IOAbstract, { IOParams } from "./io-abstract";

function canonize(str: string): Optional<StringDate> {
  return str;
}

export default function IODate(
  options: {
    min?: string;
    max?: string;
  } & IOParams<Optional<StringDate | Date>>
) {
  return IOAbstract(options, {
    renderOutput: (value) => (
      <div>{date2HumanString(normalizeDate(value))}</div>
    ),
    renderInput: (value) => (
      <input
        className="form-control"
        name={options.name}
        defaultValue={(value ?? 0) + ""}
        onBlur={(evt) =>
          options.onChange && options.onChange(canonize(evt.target.value))
        }
        type="date"
        min={options.min}
        max={options.max}
      />
    )
  });
}
