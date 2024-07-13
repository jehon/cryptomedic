import React, { createContext, useContext } from "react";
import generateUUID from "../utils/generate-uuid";
import { toTitleCase } from "../utils/strings";
import "./io.css";

// Will be initiated at higher level
export const EditContext = createContext(false);

export type IOParams<T> = {
  name?: string;
  label?: string;
  readonly?: boolean;
  value: T;
  required?: boolean;
  note?: boolean;
  left?: boolean;
  right?: boolean;
  e2eExcluded?: boolean;
  onChange?: (arg: T) => void;
};

export default function IOAbstract<T>(
  props: IOParams<T>,
  {
    renderOutput,
    renderInput
  }: {
    renderOutput: { (value: T): React.ReactNode };
    renderInput?: { (uuid: string, value: T): React.ReactNode };
  }
): React.ReactNode {
  props = {
    readonly: false,
    required: false,
    note: false, // TODO: Check usage
    left: false, // TODO: Check usage
    right: false, // TODO: Check usage
    e2eExcluded: false, // Wether the data should be excluded from e2e
    ...props
  };

  if (!renderInput) {
    renderInput = (uuid: string, value: T): React.ReactNode =>
      renderOutput(value);
  }

  // ReadOnly always prevent edit mode
  const edit = useContext(EditContext) && !props.readonly;

  // Hide if not value and output mode
  if (!edit && !props.value) {
    return null;
  }

  // TODO: handle left / right

  const uuid = generateUUID();
  return (
    <div
      className={
        "io " +
        (props.note ? "io-note " : "") +
        (edit ? "io-input" : "io-output")
      }
      data-role={props.label}
    >
      <label htmlFor={uuid}>
        {props.label ? props.label : toTitleCase(props.name || "")}
        {props.required ? "*" : ""}
      </label>
      <div className="content" data-e2e={props.e2eExcluded ? "excluded" : ""}>
        {edit ? renderInput(uuid, props.value) : renderOutput(props.value)}
      </div>
    </div>
  );
}
