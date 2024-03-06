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

  return top ? (
    <div className="io-img fullscreen" onClick={() => setTop(!top)}>
      <img data-role="image" src={value} alt="Content" />
      <img data-decorator src="/static/img/io/exit.svg" alt="Exit" />
    </div>
  ) : (
    <div className="io-img" onClick={() => setTop(!top)}>
      <img data-role="image" src={value} alt="Content" />
      <img
        data-decorator
        src="/static/img/io/fullscreen.svg"
        alt="Fullscreen"
      />
    </div>
  );
}
