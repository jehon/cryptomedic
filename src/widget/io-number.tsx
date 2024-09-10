import { roundTo } from "../utils/strings";
import IOAbstract, { IOProps, IOPropsInput } from "./io-abstract";

//
// Always required
//

function canonize(str: IOPropsInput<number>): number {
  if (typeof str == "number") return str;
  if (str == undefined) return 0;

  const pi = parseInt(str);
  if (isNaN(pi)) return 0;
  return pi;
}

export default function IONumber(
  props: {
    precision?: number;
    min?: string | number;
    max?: string | number;
  } & IOProps<number>
) {
  return IOAbstract<number>(
    { ...props },
    {
      renderOutput: (value) => (
        <div>
          {props.precision && value
            ? roundTo(canonize(value), props.precision)
            : "" + value}
        </div>
      ),
      renderInput: (value, uuid) => (
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
    }
  );
}
