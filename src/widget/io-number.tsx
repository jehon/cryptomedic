import React from "react";
import IOAbstract from "./io-abstract";

export default class IOString extends IOAbstract<number> {
  renderOutput(value: number) {
    return <div>{value}</div>;
  }

  renderInput(value: number, required: boolean): React.ReactNode {
    return this.renderOutput(value);
  }

  getInputValue(): number {
    return this.props.value;
  }
}
