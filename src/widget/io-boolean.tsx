import React from "react";

import IOAbstract from "./io-abstract";
import { ImgBooleanFalse, ImgBooleanTrue } from "./images";

export default class IOBoolean extends IOAbstract<boolean> {
  renderOutput(value: boolean) {
    return value ? ImgBooleanTrue() : ImgBooleanFalse();
  }

  renderInput(value: boolean, required: boolean) {
    return this.renderOutput(value);
  }

  getInputValue(): boolean {
    return this.props.value;
  }
}
