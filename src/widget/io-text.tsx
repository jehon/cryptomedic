import React from "react";
import IOAbstract from "./io-abstract";

export default class IOString extends IOAbstract<string> {
  renderOutput(value: string) {
    return <div>{value}</div>;
  }

  renderInput(value: string, required: boolean): React.ReactNode {
    return this.renderOutput(value);
  }

  getInputValue(): string {
    return this.props.value;
  }
}
