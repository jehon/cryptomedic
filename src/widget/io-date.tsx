import React from "react";
// import { padLeftTrim } from "../utils/string";
import S from "string";

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

    return `${S(date.getDate()).padLeft(2, "0")}-${S(
      date.getMonth() + 1
    ).padLeft(2, "0")}-${S(date.getFullYear()).padLeft(4, "0")}`;
  }
}
