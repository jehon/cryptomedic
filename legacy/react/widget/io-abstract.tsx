import React from "react";

import { toTitleCase } from "../utils/strings";
import "./io.css";

export type IOParams<T> = {
  name?: string;
  label?: string;
  readonly?: boolean;
  value: T;
  width?: number;
  required?: boolean;
  note?: boolean;
  left?: boolean;
  right?: boolean;
  variable?: boolean;
  onChange?: (arg: T) => void;
};

export default function IOAbstract<T>(
  props: IOParams<T>,
  {
    renderOutput,
    renderInput
  }: {
    renderOutput: { (value: T): React.ReactNode };
    renderInput?: { (value: T): React.ReactNode };
  }
): React.ReactNode {
  props = {
    readonly: false,
    required: false,
    note: false,
    left: false,
    right: false,
    variable: false,
    ...props
  };
  renderInput = renderInput || renderOutput;

  const edit = location.search == "?edit" && !props.readonly;

  // Hide if not value and output mode
  if (!edit && !props.value) {
    return null;
  }

  // TODO: handle left / right

  return (
    <div className={"io" + (props.note ? " note" : "")} data-role={props.label}>
      <label>
        {props.label ? props.label : toTitleCase(props.name || "")}
        {props.required ? "*" : ""}
      </label>
      <div className="content" data-variable={props.variable ? "variable" : ""}>
        {edit ? renderInput(props.value) : renderOutput(props.value)}
      </div>
    </div>
  );
}
