import React from "react";
import IOAbstract from "./io-abstract";
import { Optional } from "../utils/generic-types";
import { date2HumanString, normalizeDate } from "../utils/date";

export default class IODate extends IOAbstract<Optional<Date>> {
  renderOutput(value: Optional<Date>) {
    value = normalizeDate(value);

    return <div>{date2HumanString(value)}</div>;
  }

  renderInput(value: Optional<Date>, required: boolean): React.ReactNode {
    return this.renderOutput(value);
  }

  getInputValue(): Optional<Date> {
    return this.props.value;
  }
}
