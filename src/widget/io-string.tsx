import IOAbstract, { IOProps } from "./io-abstract";

export default function IOString(props: IOProps<string>) {
  return IOAbstract(props, {
    renderOutput: (value) => <div>{value}</div>,
    renderInput: (value, uuid) => (
      <input
        id={uuid}
        className="form-control"
        name={props.name}
        defaultValue={value ?? ""}
        onBlur={(evt) => props.onChange && props.onChange(evt.target.value)}
        {...props.htmlProps}
      />
    )
  });
}
