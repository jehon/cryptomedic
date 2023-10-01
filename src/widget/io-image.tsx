import React, { useState } from "react";
import { IOParams } from "./io-abstract";
import { Optional } from "../utils/generic-types";

// For styling, see io.css

export default function IOPicture(props: IOParams<Optional<string>>) {
  const [top, setTop] = useState(false);

  const value = props.value;

  if (!value) {
    return "No image";
  }

  return (
    <img
      className={"io-img" + (top ? " fullscreen" : "")}
      src={value}
      alt="Content"
      onClick={() => setTop(!top)}
    />
  );
}
