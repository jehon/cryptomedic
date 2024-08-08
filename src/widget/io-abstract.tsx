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
  label?: string;
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
  props = {
    readonly: false,
    required: false,
    noLabel: false,
    note: false,
    left: false, // TODO: Check usage
    right: false, // TODO: Check usage
    e2eExcluded: false, // Wether the data should be excluded from e2e
    ...props
  };

  if (!renderInput) {
    renderInput = (_uuid: string, value: T): React.ReactNode =>
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
      data-role={getLabel(props)}
    >
      {props.noLabel || (
        <label htmlFor={uuid}>
          {getLabel(props)}
          {props.required ? "*" : ""}
        </label>
      )}
      <div className="content" data-e2e={props.e2eExcluded ? "excluded" : ""}>
        {edit ? renderInput(uuid, props.value) : renderOutput(props.value)}
      </div>
    </div>
  );
}
