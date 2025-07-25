import { type StringText } from "../app-patient/_objects";
import IOAbstract, { type IOProps } from "./io-abstract";

export default function IOText(props: IOProps<StringText>) {
  const adjust = (element: HTMLTextAreaElement) => {
    // const lines = element.value.split("\n").length;
    // element.setAttribute("rows", lines);

    element.style.height = "0";
    element.style.height = "calc(" + element.scrollHeight + "px + 2em)";
  };

  return IOAbstract(
    { type: "text", ...props },
    {
      renderOutput: (value) => <pre>{value}</pre>,
      renderInput: (value, uuid) => (
        <textarea
          id={uuid}
          className="form-control"
          name={props.name}
          rows={Math.max((value || "").split("\n").length, 2)}
          defaultValue={value ?? ""}
          onKeyUp={(event) => adjust(event.target as HTMLTextAreaElement)}
          onChange={(evt) => props.onChange && props.onChange(evt.target.value)}
        />
      )
    }
  );
}
