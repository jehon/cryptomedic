import React from "react";
import { Optional } from "../utils/generic-types";

import IOAbstract from "./io-abstract";

// For styling, see io.css

export default class IOPicture extends IOAbstract<Optional<string>> {
  render(): React.ReactNode {
    const { value } = this.props;

    return this.renderOutput(value);
  }

  renderOutput(value: Optional<string>): React.ReactNode {
    if (!value) {
      return "No image";
    }

    return <img className="io-img" src={value} alt="Content" />;
  }
}
