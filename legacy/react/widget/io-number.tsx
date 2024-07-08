import React from "react";
import { Optional } from "../utils/generic-types";
import { roundTo } from "../utils/strings";
import IOAbstract, { IOParams } from "./io-abstract";

export default function IONumber(
  options: { precision?: number; min?: number; max?: number } & IOParams<
    Optional<number>
  >
) {
  return IOAbstract<Optional<number>>(options, {
    renderOutput: (value) => (
      <div>
        {options.precision && value
          ? roundTo(value, options.precision)
          : "" + value}
      </div>
    ),
    renderInput: (value: Optional<number>) => (
      <input
        name={options.name}
        defaultValue={(value ?? 0) + ""}
        type="number"
        min={options.min}
        max={options.max}
      />
    )
  });
}
