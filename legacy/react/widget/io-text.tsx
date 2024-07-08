import React from "react";
import { StringText } from "../utils/types";
import IOAbstract, { IOParams } from "./io-abstract";

export default function IOText(options: IOParams<StringText>) {
  const adjust = (element: HTMLTextAreaElement) => {
    // const lines = element.value.split("\n").length;
    // element.setAttribute("rows", lines);

    element.style.height = "0";
    element.style.height = "calc(" + element.scrollHeight + "px + 2em)";
  };

  return IOAbstract(options, {
    renderOutput: (value) => <pre>{value}</pre>,
    renderInput: (value) => (
      <textarea
        className="form-control"
        name={options.name}
        defaultValue={value ?? ""}
        onKeyUp={(event) => adjust(event.target as HTMLTextAreaElement)}
        onBlur={(evt) => options.onChange && options.onChange(evt.target.value)}
      />
    )
  });
}
