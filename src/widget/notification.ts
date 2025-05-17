import * as toastr from "toastr";
import "toastr/build/toastr.min.css";
import { passThrough } from "../utils/promises";

// https://github.com/CodeSeven/toastr
// https://codeseven.github.io/toastr/demo.html

//
// We can not use global options because they do not work in UT
//
export default function notification<T>(message: string): (a: T) => T {
  return passThrough(() => toastr.success(message, "", { timeOut: 3 * 1000 }));
}
