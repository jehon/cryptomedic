import React from "react";
import { Optional } from "../utils/generic-types";
import IOAbstract, { IOParams } from "./io-abstract";

export default function IOText(options: IOParams<string>) {
  const adjust = (element: HTMLTextAreaElement) => {
    // const lines = element.value.split("\n").length;
    // element.setAttribute("rows", lines);

    element.style.height = "0";
    element.style.height = "calc(" + element.scrollHeight + "px + 2em)";
  };

  return IOAbstract<Optional<string>>(options, {
    renderOutput: (value) => <pre>{value}</pre>,
    renderInput: (value: Optional<string>) => (
      <textarea
        className="form-control"
        name={options.name}
        defaultValue={value ?? ""}
        onKeyUp={(event) => adjust(event.target as HTMLTextAreaElement)}
      />
    )
  });
}
