import React from "react";
import IOAbstract, { IOParams } from "./io-abstract";

type T = () => string;

export default function IOFunction(options: IOParams<T>) {
  return IOAbstract<T>(options, {
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
