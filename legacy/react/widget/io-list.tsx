import React from "react";
import { Optional } from "../utils/generic-types";
import { StringList } from "../utils/types";
import IOAbstract, { IOParams } from "./io-abstract";

export default function IOList(
  options: { list?: string[] } & IOParams<Optional<StringList>>
) {
  return IOAbstract<Optional<string>>(options, {
    renderOutput: (value) => <div>{value}</div>
  });
}
