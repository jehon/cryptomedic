import React, { useState } from "react";
import IOAbstract, { IOParams } from "./io-abstract";
import { Optional } from "../utils/generic-types";

// For styling, see io.css

export default function IOPicture(options: IOParams<Optional<string>>) {
  const [top, setTop] = useState(false);

  return IOAbstract<Optional<string>>(options, {
    renderOutput: (value) => {
      if (!value) {
        return "No image";
      }

      return (
        <img
          className={"io-img" + top ? " fullscreen" : ""}
          src={value}
          alt="Content"
          onClick={() => setTop(!top)}
        />
      );
    }
  });
}
