import IOAbstract, { type IOProps } from "./io-abstract";

export default function IOHidden(props: IOProps<string | number>) {
  return IOAbstract(
    { type: "hidden", ...props },
    {
      renderOutput: (value) => <div>{value}</div>,
      renderInput: (value, uuid) => (
        <div>
          {value ?? ""}
          <input
            id={uuid}
            type="hidden"
            name={props.name}
            value={value ?? ""}
            {...props.htmlProps}
          />
        </div>
      )
    }
  );
}
