import React from "react";
import { Optional } from "../utils/generic-types";
import { toTitleCase } from "../utils/strings";
import { StringList } from "../utils/types";
import IOAbstract, { IOParams } from "./io-abstract";

// In other part of the application, it could be a mapping
// Ex: io-boolean, search panels
export function canonizeList(
  list: string[] | Record<string, string>
): Record<string, string> {
  if (Array.isArray(list)) {
    return list.reduce((acc, k) => ({ ...acc, [k]: toTitleCase(k) }), {});
  }
  return list;
}

export function buildSelect(
  list: Record<string, string>,
  value: string,
  name: string,
  onChange: (val: string) => void = () => {}
) {
  return (
    <select
      className="form-control"
      name={name}
      defaultValue={value ?? ""}
      onBlur={(evt) => onChange(evt.target.value)}
    >
      {Object.entries(list).map(([v, k]) => (
        <option value={v}>{k}</option>
      ))}
    </select>
  );
}
export function buildRadios() {}

export default function IOList(
  options: { list?: string[] | Record<string, string> } & IOParams<
    Optional<StringList>
  >
) {
  // TODO: List should be mandatory and thus ?? {} not necessary anymore
  const list: Record<string, string> = canonizeList(options.list ?? {});

  return IOAbstract<Optional<string>>(options, {
    renderOutput: (value) => <div>{value}</div>,
    renderInput: (value) =>
      buildSelect(list, value ?? "", options.name ?? "", options.onChange)
  });
}
