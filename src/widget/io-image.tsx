import React from "react";
import { Optional } from "../utils/generic-types";

import IOAbstract from "./io-abstract";

export default class IOPicture extends IOAbstract<Optional<string>> {
  render(): React.ReactNode {
    const { value } = this.props;

    return this.renderOutput(value);
  }

  renderOutput(value: Optional<string>): React.ReactNode {
    if (!value) {
      return "No image";
    }

    return (
      <img
        src={value}
        alt="Content"
        style={{ objectFit: "contain", height: "100%" }}
      />
    );
  }
}
