import React from "react";
import IOAbstract from "./io-abstract";

type T = () => string;

export default class IOFunction extends IOAbstract<T> {
  renderOutput(value: T) {
    try {
      return <div>{value()}</div>;
    } catch (e: any) {
      return <div className="error">{e.message}</div>;
    }
  }
}
