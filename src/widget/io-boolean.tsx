import IOAbstract, { IOProps } from "./io-abstract";

//
// Always required
//

function isTrue(v: any) {
  if (v === undefined || v === null) {
    return false;
  }

  if (typeof v == "boolean") {
    return v;
  }

  if (v == "0" || v == 0) {
    return false;
  }

  if (v == "1" || v == 1) {
    return true;
  }

  return !!v;
}

export default function IOBoolean(props: IOProps<boolean>) {
  return IOAbstract(
    { ...props, required: true, value: isTrue(props.value) },
    {
      renderOutput: (value) => isTrue(value) && <div>✔</div>,
      renderInput: (value, uuid) => (
        <>
          <input type="hidden" name={props.name} value="" />
          <input
            id={uuid}
            type="checkbox"
            className="form-control"
            name={props.name}
            value="1"
            defaultChecked={isTrue(value)}
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
