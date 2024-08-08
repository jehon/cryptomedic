import React, { createContext, useContext } from "react";
import generateUUID from "../utils/generate-uuid";
import { toTitleCase } from "../utils/strings";
import "./io.css";

// Will be initiated at higher level
export const EditContext = createContext(false);

function getLabel(props: IOProps<any>) {
  if (props.label) {
    return props.label;
  }
  if (props.name) {
    return toTitleCase(props.name);
  }
  return generateUUID();
}

export type IOPropsReadonly<T> = {
  label?: string;
  value: T;
  noLabel?: boolean;
  note?: boolean;
  left?: boolean;
  right?: boolean;
  e2eExcluded?: boolean;
};

export type IOProps<T> = IOPropsReadonly<T> & {
  name?: string;
  readonly?: boolean;
  required?: boolean;
  onChange?: (arg: T) => void;
};

export default function IOAbstract<T>(
  props: IOProps<T>,
  {
    renderOutput,
    renderInput
  }: {
    renderOutput: { (value: T): React.ReactNode };
    renderInput?: { (uuid: string, value: T): React.ReactNode };
  }
): React.ReactNode {
  const calculatedProps: IOProps<T> = {
    readonly: false,
    required: false,
    noLabel: false,
    note: false,
    left: false, // TODO: Check usage
    right: false, // TODO: Check usage
    e2eExcluded: false, // Wether the data should be excluded from e2e
    ...props
  };

  const writable = !!calculatedProps.name;

  // ReadOnly always prevent edit mode
  const edit = useContext(EditContext) && writable;

  // Hide if not value and output mode
  if (!edit && !calculatedProps.value) {
    return null;
  }

  // TODO: handle left / right

  const uuid = generateUUID();
  return (
    <div
      className={
        "io " +
        (calculatedProps.note ? "io-note " : "") +
        (edit ? "io-input" : "io-output")
      }
      data-role={getLabel(calculatedProps)}
    >
      {calculatedProps.noLabel || (
        <label htmlFor={uuid}>
          {getLabel(calculatedProps)}
          {calculatedProps.required ? "*" : ""}
        </label>
      )}
      <div
        className="content"
        data-e2e={calculatedProps.e2eExcluded ? "excluded" : ""}
      >
        {edit
          ? renderInput!(uuid, calculatedProps.value)
          : renderOutput(calculatedProps.value)}
      </div>
    </div>
  );
}
