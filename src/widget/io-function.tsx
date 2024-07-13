import React from "react";
import IOAbstract, { IOProps } from "./io-abstract";

type T = () => string;

export default function IOFunction(props: IOProps<T>) {
  return IOAbstract<T>(props, {
    renderOutput: (value) => {
      try {
        return <div>{value()}</div>;
      } catch (e: any) {
        // console.trace("io-function", e);
        return <div className="io-function-error">{e.message}</div>;
      }
    }
  });
}
