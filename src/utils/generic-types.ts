/**
 * To simplify all parameters
 */
export interface ObjectMap<T> {
  [key: string]: T;
}

export type Optional<T> = T | null;
