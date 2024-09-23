import { ImgBooleanFalse, ImgBooleanTrue } from "./images";
import IOAbstract, { IOProps } from "./io-abstract";
import { buildRadios } from "./io-list";

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
    { ...props, required: true },
    {
      renderOutput: (value) =>
        isTrue(value) ? ImgBooleanTrue() : ImgBooleanFalse(),
      renderInput: (value, uuid) =>
        buildRadios(
          uuid,
          {
            1: "Yes",
            0: "No"
          },
          isTrue(value) ? "1" : "0",
          props.name ?? "",
          (val: string) => props.onChange && props.onChange(isTrue(val))
        )
    }
  );
}
