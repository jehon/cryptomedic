import IOAbstract, { IOPropsReadonly } from "./io-abstract";

type T = () => string;

export default function IOFunction(props: IOPropsReadonly<T>) {
  if (typeof props.value != "function") {
    throw new Error(`Invalid value in IOFunction: ${props.value}}`);
  }

  return IOAbstract<T>(props, {
    renderOutput: (value) => {
      try {
        return <div>{typeof value == "function" && value()}</div>;
      } catch (e: any) {
        // console.trace("io-function", e);
        return <div className="io-function-error">{e.message}</div>;
      }
    }
  });
}
