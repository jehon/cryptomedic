import { StringText } from "../utils/types";
import IOAbstract, { IOProps } from "./io-abstract";

export default function IOText(props: IOProps<StringText>) {
  const adjust = (element: HTMLTextAreaElement) => {
    // const lines = element.value.split("\n").length;
    // element.setAttribute("rows", lines);

    element.style.height = "0";
    element.style.height = "calc(" + element.scrollHeight + "px + 2em)";
  };

  return IOAbstract(props, {
    renderOutput: (value) => <pre>{value}</pre>,
    renderInput: (uuid: string, value) => (
      <textarea
        id={uuid}
        className="form-control"
        name={props.name}
        defaultValue={value ?? ""}
        onKeyUp={(event) => adjust(event.target as HTMLTextAreaElement)}
        onBlur={(evt) => props.onChange && props.onChange(evt.target.value)}
      />
    )
  });
}
