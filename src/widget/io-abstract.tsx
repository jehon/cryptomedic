import React from "react";

import "./io.css";

export type IOParams<T> = {
  label: string;
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
    renderInput?: { (value: T, required?: boolean): React.ReactNode };
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

  // All execpt read without value
  if (!props.edit && !props.value) {
    return null;
  }

  // TODO: handle left / right

  return (
    <div className={"io" + (props.note ? " note" : "")} data-role={props.label}>
      <label
        dangerouslySetInnerHTML={{
          __html: props.label + (props.required ? "*" : "")
        }}
      ></label>
      <div className="content" data-variable={props.variable ? "variable" : ""}>
        {props.edit
          ? renderOutput(props.value)
          : renderInput(props.value, props.required)}
      </div>
    </div>
  );
}
