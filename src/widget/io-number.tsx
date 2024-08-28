import { Optional } from "../utils/generic-types";
import { roundTo } from "../utils/strings";
import IOAbstract, { IOProps } from "./io-abstract";

function canonize(str: string): Optional<number> {
  const pi = parseInt(str);
  if (isNaN(pi)) return null;
  return pi;
}

export default function IONumber(
  props: {
    precision?: number;
    min?: string | number;
    max?: string | number;
  } & IOProps<Optional<number>>
) {
  return IOAbstract<Optional<number>>(props, {
    renderOutput: (value) => (
      <div>
        {props.precision && value
          ? roundTo(value, props.precision)
          : "" + value}
      </div>
    ),
    renderInput: (uuid: string, value: Optional<number>) => (
      <input
        id={uuid}
        className="form-control"
        name={props.name}
        defaultValue={(value ?? 0) + ""}
        onBlur={(evt) =>
          props.onChange && props.onChange(canonize(evt.target.value))
        }
        type="number"
        min={"" + props.min}
        max={"" + props.max}
      />
    )
  });
}
