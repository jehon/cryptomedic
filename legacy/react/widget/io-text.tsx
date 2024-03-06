import React from "react";
import IOAbstract, { IOParams } from "./io-abstract";
import { Optional } from "../utils/generic-types";

export default function IOText(options: IOParams<string>) {
  return IOAbstract<Optional<string>>(options, {
    renderOutput: (value) => <pre>{value}</pre>
  });
}
