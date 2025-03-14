import { useContext } from "react";
import IOAbstract, { EditContext, type IOPropsReadonly } from "./io-abstract";

type T = () => string;

export default function IOFunction(props: IOPropsReadonly<T>) {
  if (typeof props.value != "function") {
    throw new Error(`Invalid value in IOFunction: ${props.value}}`);
  }

  const editContext = useContext(EditContext);
  if (editContext) {
    return <></>;
  }

  return IOAbstract<T>(
    { type: "function", note: true, ...props },
    {
      renderOutput: (value) => {
        try {
          return <div>{typeof value == "function" && value()}</div>;
        } catch (e: any) {
          return <div className="io-function-error">{e.message}</div>;
        }
      }
    }
  );
}
