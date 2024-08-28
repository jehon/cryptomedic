export const defaultWidthBox: string = "calc(min(100%, 300px))";
export const defaultWidthScreen: string = "calc(min(100%, 800px))";

// TODO: Remove what is not necessary

// https://coryrylan.com/blog/how-to-use-web-components-with-typescript-and-react
export type MyWebComponent<T> = Partial<
  // https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys
  // https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype
  Omit<T, "style" | "children"> & {
    style: Partial<CSSStyleDeclaration>;
  } & { children: React.ReactNode | React.ReactNode[] }
>;

type MyCustomEvents<K extends string> = {
  [key in K]: (event: CustomEvent) => void;
};

export type MyWebComponentWithEvents<T, K extends string> = Partial<
  MyWebComponent<T> & MyCustomEvents<`on${K}`>
>;
