import { type StringDate } from "../app-patient/objects";
import { outputDate, periodAsHumanReadable } from "../utils/date";
import IOAbstract, { type IOProps } from "./io-abstract";

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
  return IOAbstract(
    { type: "date", ...props },
    {
      renderOutput: (value) => (
        <>
          <div>{outputDate(value)}</div>
          <div data-e2e="excluded">{periodAsHumanReadable(value)}</div>
        </>
      ),
      renderInput: (value, uuid) => (
        <input
          id={uuid}
          className="form-control"
          name={props.name}
          defaultValue={(value ?? 0) + ""}
          onChange={(evt) => props.onChange && props.onChange(evt.target.value)}
          type="date"
          min={props.min}
          max={props.max}
          required={props.required}
        />
      )
    }
  );
}
