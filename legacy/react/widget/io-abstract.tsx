import React from "react";

import { toTitleCase } from "../utils/strings";
import "./io.css";

export type IOParams<T> = {
  name?: string;
  label?: string;
  value: T;
  width?: number;
  edit?: boolean;
  required?: boolean;
  note?: boolean;
  left?: boolean;
  right?: boolean;
  variable?: boolean;
};

export default function IOAbstract<T>(
  props: IOParams<T>,
  {
    renderOutput,
    renderInput,
    onChange
  }: {
    renderOutput: { (value: T): React.ReactNode };
    renderInput?: { (value: T): React.ReactNode };
    onChange?: () => T;
  }
): React.ReactNode {
  props = {
    edit: false,
    required: false,
    note: false,
    left: false,
    right: false,
    variable: false,
    ...props
  };
  renderInput = renderInput || renderOutput;

  // Hide if not value and output mode
  if (!props.edit && !props.value) {
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
        {props.edit ? renderInput(props.value) : renderOutput(props.value)}
      </div>
    </div>
  );
}
