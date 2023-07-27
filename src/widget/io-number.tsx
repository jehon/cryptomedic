import React from "react";
import IOAbstract from "./io-abstract";
import { Optional } from "../utils/generic-types";

export default class IOString extends IOAbstract<Optional<number>> {
  renderOutput(value: Optional<number>) {
    return <div>{value}</div>;
  }

  renderInput(value: Optional<number>, required: boolean): React.ReactNode {
    return this.renderOutput(value);
  }

  getInputValue(): Optional<number> {
    return this.props.value;
  }
}
