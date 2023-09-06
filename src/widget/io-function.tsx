import React from "react";
import IOAbstract from "./io-abstract";

type T = () => string;

export default class IOFunction extends IOAbstract<T> {
  renderOutput(value: T) {
    try {
      return <div>{value()}</div>;
    } catch (e: any) {
      // console.trace("io-function", e);
      return <div className="io-function-error">{e.message}</div>;
    }
  }
}
