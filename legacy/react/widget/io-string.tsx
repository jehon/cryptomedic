import React from "react";
import IOAbstract, { IOParams } from "./io-abstract";
import { Optional } from "../utils/generic-types";

export default function IOString(options: IOParams<Optional<string>>) {
  return IOAbstract<Optional<string>>(options, {
    renderOutput: (value) => <div>{value}</div>
  });
}
