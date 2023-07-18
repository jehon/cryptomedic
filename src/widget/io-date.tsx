import React from "react";
import { padLeftTrim } from "../utils/string";

export default class IODate extends React.Component<{ value?: Date }, {}> {
  static Invalid = "Invalid date";

  render() {
    return this.renderRead();
  }

  renderRead() {
    const date = this.props.value;

    if (date == null) {
      return "";
    }

    if (isNaN(date.getFullYear())) {
      return IODate.Invalid;
    }

    return `${padLeftTrim(date.getDate(), 2)}-${padLeftTrim(
      date.getMonth() + 1,
      2
    )}-${padLeftTrim(date.getFullYear(), 4)}`;
  }
}
