import React from "react";
import IOAbstract, { IOParams } from "./io-abstract";
import { Optional } from "../utils/generic-types";
import { date2HumanString, normalizeDate } from "../utils/date";

export default function IODate(options: IOParams<Optional<Date>>) {
  return IOAbstract<Optional<Date>>(options, {
    renderOutput: (value) => <div>{date2HumanString(normalizeDate(value))}</div>
  });
}
