import React from "react";
import IOAbstract from "./io-abstract";
import { padLeftTrim } from "../utils/strings";
import { Optional } from "../utils/generic-types";
import { normalizeDate } from "../utils/date";

export default class IODate extends IOAbstract<Optional<Date>> {
  static Invalid = "Invalid date";

  renderOutput(value: Optional<Date>) {
    value = normalizeDate(value);

    if (value == null) {
      return "";
    }

    if (isNaN(value.getFullYear())) {
      return IODate.Invalid;
    }

    return (
      <div>
        `{padLeftTrim(value.getDate(), 2)}-
        {padLeftTrim(value.getMonth() + 1, 2)}-
        {padLeftTrim(value.getFullYear(), 4)}`
      </div>
    );
  }

  renderInput(value: Optional<Date>, required: boolean): React.ReactNode {
    return this.renderOutput(value);
  }

  getInputValue(): Optional<Date> {
    return this.props.value;
  }
}
