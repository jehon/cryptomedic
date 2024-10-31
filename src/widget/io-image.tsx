import { useState } from "react";
import { Optional } from "../utils/generic-types";
import IOAbstract, { IOProps } from "./io-abstract";
import "./io-image.css";

// For styling, see io.css

export default function IOImage(props: IOProps<Optional<string>>) {
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
    IOAbstract(
      { ...props, type: "image" },
      {
        renderOutput: (value) => (
          <div className="io-img" onClick={() => setTop(!top)}>
            <img data-role="image" src={value + "/thumbnail"} alt="Content" />
            <img
              data-decorator
              src="/static/img/io/fullscreen.svg"
              alt="Fullscreen"
            />
          </div>
        ),
        renderInput: (value, uuid) => <></>
      }
    )
  );
}
