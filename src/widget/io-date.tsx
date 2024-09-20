import { outputDate, periodAsHumanReadable } from "../utils/date";
import { StringDate } from "../utils/types";
import IOAbstract, { IOProps } from "./io-abstract";

//
// We receive strings from database
// But we also build some Date in the Gui
//
export default function IODate(
  props: {
    min?: string;
    max?: string;
  } & IOProps<StringDate | Date>
) {
  return IOAbstract(props, {
    renderOutput: (value) => (
      <>
        <div>{outputDate(value)}</div>
        <div className="note" data-e2e="excluded">
          {periodAsHumanReadable(value)}
        </div>
      </>
    ),
    renderInput: (value, uuid) => (
      <input
        id={uuid}
        className="form-control"
        name={props.name}
        defaultValue={(value ?? 0) + ""}
        onBlur={(evt) => props.onChange && props.onChange(evt.target.value)}
        type="date"
        min={props.min}
        max={props.max}
        required={props.required}
      />
    )
  });
}
