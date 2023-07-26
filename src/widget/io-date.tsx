import React from "react";
import IOAbstract from "./io-abstract";
import { padLeftTrim } from "../utils/strings";

export default class IODate extends IOAbstract<Date | null> {
  static Invalid = "Invalid date";

  renderOutput(value) {
    if (value == null) {
      return "";
    }

    if (isNaN(value.getFullYear())) {
      return IODate.Invalid;
    }

    return (
      <div>
        `${padLeftTrim(value.getDate(), 2)}-$
        {padLeftTrim(value.getMonth() + 1, 2)}-$
        {padLeftTrim(value.getFullYear(), 4)}`
      </div>
    );
  }

  renderInput(value: Date | null, required: boolean): React.ReactNode {
    return this.renderOutput(value);
  }

  getInputValue(): Date | null {
    return this.props.value;
  }
}
