/**
 * To simplify all parameters
 */
export interface ObjectMap<T> {
  [key: string]: T;
}

export interface Config extends ObjectMap<string> {}
