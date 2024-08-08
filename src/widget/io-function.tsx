import React from "react";
import IOAbstract, { IOPropsReadonly } from "./io-abstract";

type T = () => string;

export default function IOFunction(props: IOPropsReadonly<T>) {
  return IOAbstract<T>(
    { ...props, readonly: true },
    {
      renderOutput: (value) => {
        try {
          return <div>{value()}</div>;
        } catch (e: any) {
          // console.trace("io-function", e);
          return <div className="io-function-error">{e.message}</div>;
        }
      }
    }
  );
}
