import React from "react";
import IOAbstract, { IOParams } from "./io-abstract";
import { Optional } from "../utils/generic-types";
import { roundTo } from "../utils/strings";

export default function IONumber(
  options: { precision?: number } & IOParams<Optional<number>>
) {
  return IOAbstract<Optional<number>>(options, {
    renderOutput: (value) => (
      <div>
        {options.precision && value
          ? roundTo(value, options.precision)
          : "" + value}
      </div>
    )
  });
}
