/**
 * To simplify all parameters
 */
export interface ObjectMap<T> {
  [key: string]: T;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Config extends ObjectMap<string> {}

export type Optional<T> = T | null;
