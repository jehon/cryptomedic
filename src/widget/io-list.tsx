import React from "react";
import IOString from "./io-string";

export default class IOList extends IOString<{ list?: string[] }> {
  renderInput(value: string, required: boolean): React.ReactNode {
    return this.renderOutput(value);
  }

  getInputValue(): string {
    return this.props.value;
  }
}
