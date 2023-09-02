import React from "react";
import { Optional } from "../utils/generic-types";

import IOAbstract from "./io-abstract";
import { roundTo } from "../utils/strings";

export default class IONumber extends IOAbstract<
  Optional<number>,
  { precision?: number }
> {
  renderOutput(value: Optional<number>) {
    return (
      <div>
        {this.props.precision && value
          ? roundTo(value, this.props.precision)
          : "" + value}
      </div>
    );
  }

  renderInput(value: Optional<number>, required: boolean): React.ReactNode {
    return this.renderOutput(value);
  }

  getInputValue(): Optional<number> {
    return this.props.value;
  }
}
