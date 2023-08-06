import React from "react";

export let defaultWidthBox: string = "calc(min(100%, 300px))";
export let defaultWidthScreen: string = "calc(min(100%, 800px))";

// const integrities: Record<string, string> = {
//   "5.3.1":
//     "sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9"
// };
// const currentVersion = "5.3.1";

// export function getBootstrapStyle(version = currentVersion) {
//   if (!(version in integrities)) {
//     console.error("Bootstrap version not found in integrities: ", version);
//   }

//   return `<link
//     href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css"
//     integrity="${integrities[version]}"
//     rel="stylesheet"
//     crossorigin="anonymous"
//     >`;
// }

// https://coryrylan.com/blog/how-to-use-web-components-with-typescript-and-react
export type MyWebComponent<T> = Partial<
  // https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys
  // https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype
  Omit<T, "style" | "children"> & {
    style: Partial<CSSStyleDeclaration>;
  } & { children: React.ReactNode[] }
>;

type MyCustomEvents<K extends string> = {
  [key in K]: (event: CustomEvent) => void;
};

export type MyWebComponentWithEvents<T, K extends string> = Partial<
  MyWebComponent<T> & MyCustomEvents<`on${K}`>
>;

// declare global {
//   namespace JSX {
//     interface IntrinsicElements {
//       ['x-alert']: MyWebComponent<XAlert>;
//       ['x-alert']: MyWebComponentWithEvents<XAlert, 'closeChange' | 'openChange'>;
//     }
//   }
// }
