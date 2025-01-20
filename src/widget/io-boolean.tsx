import { string2Boolean } from "../utils/strings";
import IOAbstract, { type IOProps } from "./io-abstract";

//
// Always required
//

export default function IOBoolean(props: IOProps<boolean>) {
  return IOAbstract(
    {
      ...props,
      type: "boolean",
      required: true,
      value: string2Boolean(props.value)
    },
    {
      renderOutput: (value) => string2Boolean(value) && <div>✔</div>,
      renderInput: (value, uuid) => (
        <>
          <input type="hidden" name={props.name} value="" />
          <input
            id={uuid}
            type="checkbox"
            className="form-control"
            name={props.name}
            value="1"
            defaultChecked={string2Boolean(value)}
            onBlur={(evt) =>
              props.onChange && props.onChange(evt.target.checked)
            }
            {...props.htmlProps}
          />
        </>
      )
    }
  );
}
