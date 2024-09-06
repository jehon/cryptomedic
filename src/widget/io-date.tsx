import { outputDate } from "../utils/date";
import { StringDate } from "../utils/types";
import IOAbstract, { IOProps } from "./io-abstract";

function canonize(str: string): StringDate | undefined {
  return str;
}

export default function IODate(
  props: {
    min?: string;
    max?: string;
  } & IOProps<StringDate | Date | undefined>
) {
  return IOAbstract(props, {
    renderOutput: (value) => <div>{outputDate(value)}</div>,
    renderInput: (uuid: string, value) => (
      <input
        id={uuid}
        className="form-control"
        name={props.name}
        defaultValue={(value ?? 0) + ""}
        onBlur={(evt) =>
          props.onChange && props.onChange(canonize(evt.target.value))
        }
        type="date"
        min={props.min}
        max={props.max}
        required={props.required}
      />
    )
  });
}
