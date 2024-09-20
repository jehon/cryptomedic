import * as toastr from "toastr";
import "toastr/build/toastr.min.css";
import { passThrough } from "../utils/promises";

// https://github.com/CodeSeven/toastr
// https://codeseven.github.io/toastr/demo.html

// https://github.com/CodeSeven/toastr
toastr.options.timeOut = 3 * 1000;
// toastr.options.progressBar = true;

export default function notifySuccess<T>(message: string): (a: T) => T {
  return passThrough(() => toastr.success(message));
}
