import { createContext, useContext } from "react";
import generateUUID from "../utils/generate-uuid";
import { toTitleCase } from "../utils/strings";
import "./io.css";

// Will be initiated at higher level
export const EditContext = createContext(false);

export type IOPropsInput<T> = T | string | undefined;

export type IOPropsReadonly<T> = {
  label?: string;
  value: IOPropsInput<T>;
  noLabel?: boolean;
  note?: boolean;
  left?: boolean;
  right?: boolean;
  e2eExcluded?: boolean;
};

export type IOProps<T> = IOPropsReadonly<T> & {
  name?: string;
  required?: boolean;
  onChange?: (arg: T) => void;
  // To be used by sub-types
  htmlProps?: Record<string, string | number>;
};

function getLabel(props: IOProps<any>) {
  if (props.label) {
    return props.label;
  }
  if (props.name) {
    return toTitleCase(props.name);
  }
  return generateUUID();
}

export default function IOAbstract<T>(
  props: IOProps<T>,
  {
    renderOutput,
    renderInput
  }: {
    renderOutput: { (value: IOPropsInput<T>): React.ReactNode };
    renderInput?: {
      (value: IOPropsInput<T>, uuid: string): React.ReactNode;
    };
  }
): React.ReactNode {
  const calculatedProps: IOProps<T> = {
    required: false,
    noLabel: false,
    note: false,
    left: false, // TODO: Check usage
    right: false, // TODO: Check usage
    e2eExcluded: false, // Wether the data should be excluded from e2e
    ...props
  };

  const writable = !!calculatedProps.name;
  if (writable) {
    if (
      calculatedProps.label &&
      calculatedProps.label == toTitleCase(calculatedProps.name ?? "")
    ) {
      throw new Error(
        `IOAbstract: do not specify label equivalent to name (${JSON.stringify(calculatedProps)})`
      );
    }

    if (!renderInput) {
      throw new Error(
        `IOAbstract: Need the Input for non-readonly inputs (${JSON.stringify(calculatedProps)}}`
      );
    }
  }

  // ReadOnly always prevent edit mode
  const editContext = useContext(EditContext) && writable;

  // Hide if not value and output mode
  if (!editContext && !calculatedProps.value) {
    return null;
  }

  // TODO: handle left / right

  const uuid = generateUUID();
  return (
    <div
      className={
        "io " +
        (calculatedProps.note ? "io-note " : "") +
        (editContext ? "io-input" : "io-output")
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
        {editContext
          ? renderInput!(calculatedProps.value, uuid)
          : renderOutput(calculatedProps.value)}
      </div>
    </div>
  );
}
