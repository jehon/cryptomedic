import { ImgBooleanFalse, ImgBooleanTrue } from "./images";
import IOAbstract, { IOProps, IOPropsInput } from "./io-abstract";
import { buildRadios } from "./io-list";

//
// Always required
//

export function isTrue(v: IOPropsInput<boolean>) {
  if (v == undefined) {
    return false;
  }

  if (typeof v == "boolean") {
    return v;
  }

  if (v == "0") {
    return false;
  }

  if (v == "1") {
    return true;
  }

  return !!v;
}

export default function IOBoolean(props: IOProps<boolean>) {
  return IOAbstract(
    { ...props, required: true },
    {
      renderOutput: (value) =>
        isTrue(value) ? ImgBooleanTrue() : ImgBooleanFalse(),
      renderInput: (value, uuid) =>
        buildRadios(
          uuid,
          {
            Yes: "1",
            No: "0"
          },
          value == isTrue(value) ? "1" : "0",
          props.name ?? "",
          (val: string) => props.onChange && props.onChange(isTrue(val))
        )
    }
  );
}
