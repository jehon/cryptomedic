import { createContext, useContext } from "react";
import generateUUID from "../utils/generate-uuid";
import { isEmptyValue } from "../utils/objects";
import { toTitleCase } from "../utils/strings";
import "./io-abstract.css";

// Will be initiated at higher level
export const EditContext = createContext(false);

export const Modes = Object.freeze({
  input: "input",
  output: "output"
});
type ModesList = keyof typeof Modes;

export type IOPropsInput<T> = T | string | undefined;

export type IOPropsReadonly<T> = {
  label?: string;
  value: IOPropsInput<T>;
  mode?: ModesList;
  noLabel?: boolean;
  e2eExcluded?: boolean; // Wether the data should be excluded from e2e
  inputHelp?: React.ReactNode;
  appendix?: React.ReactNode;
  note?: boolean;
};

export type IOProps<T> = IOPropsReadonly<T> & {
  type?: string;
  name?: string;
  required?: boolean;
  onChange?: (arg: T) => void;
  // To be used by sub-types
  htmlProps?: Record<string, string | number | Record<string, any>>;
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
  props: IOProps<T> & {
    // Not published properties
    type: string;
  },
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
  const writable = !!props.name;
  if (writable) {
    if (props.label && props.label == toTitleCase(props.name ?? "")) {
      throw new Error(
        `IOAbstract: do not specify label equivalent to name (${JSON.stringify(props)})`
      );
    }

    if (!renderInput) {
      throw new Error(
        `IOAbstract: Need the Input for non-readonly inputs (${JSON.stringify(props)}}`
      );
    }
  }

  // ReadOnly always prevent edit mode
  const editContext = useContext(EditContext) && writable;

  const editMode =
    props.mode == "output" ? false : props.mode == "input" ? true : editContext;
  // Hide if not value and output mode
  if (!editMode && isEmptyValue(props.value)) {
    return null;
  }

  const uuid = generateUUID();
  return (
    <div
      className={
        "io " +
        (props.note ? "io-note " : "") +
        (editMode ? "io-input " : "io-output ") +
        `io-${props.type}`
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
        {editMode ? (
          <>
            {renderInput!(props.value, uuid)}
            {props.inputHelp}
          </>
        ) : (
          <>{renderOutput(props.value)}</>
        )}
      </div>
      {props.appendix && <div className="appendix">{props.appendix}</div>}
    </div>
  );
}
