import React from "react";
import { Optional } from "../utils/generic-types";
import { toTitleCase } from "../utils/strings";
import { StringList } from "../utils/types";
import IOAbstract, { IOParams } from "./io-abstract";

// In other part of the application, it could be a mapping
// Ex: io-boolean, search panels
export function canonizeList(
  list: string[] | Record<string, string>,
  includeUnknown: boolean = false
): Record<string, string> {
  if (Array.isArray(list)) {
    list = list.reduce((acc, k) => ({ ...acc, [k]: toTitleCase(k) }), {});
  }
  if (includeUnknown) {
    list = { ...list, "": "Unknown" };
  }

  return list;
}

export function buildSelect(
  uuid: string,
  list: Record<string, string>,
  value: string,
  name: string,
  onChange: (val: string) => void = () => {}
) {
  return (
    <select
      id={uuid}
      className="form-control"
      name={name}
      defaultValue={value ?? ""}
      onBlur={(evt) => onChange(evt.target.value)}
    >
      {Object.entries(list).map(([v, k]) => (
        <option key={k} value={v}>
          {k}
        </option>
      ))}
    </select>
  );
}
export function buildRadios(
  uuid: string,
  list: Record<string, string>,
  value: string,
  name: string,
  onChange: (val: string) => void = () => {}
) {
  return Object.entries(list).map(([v, k], i) => (
    <div className="align" key={k}>
      <input
        id={uuid + "." + i}
        className="form-control"
        name={name}
        defaultChecked={value === k}
        value="1"
        onBlur={(evt) => onChange(k)}
        type="radio"
      />
      <label htmlFor={uuid + "." + i}>{v}</label>
    </div>
  ));
}

export default function IOList(
  options: { list?: string[] | Record<string, string> } & IOParams<
    Optional<StringList>
  >
) {
  // TODO: List should be mandatory and thus ?? {} not necessary anymore
  const list: Record<string, string> = canonizeList(
    options.list ?? {},
    options.required
  );

  return IOAbstract<Optional<string>>(options, {
    renderOutput: (value) => <div>{value}</div>,
    renderInput: (uuid: string, value) =>
      Object.keys(list).length > 4
        ? buildSelect(
            uuid,
            list,
            value ?? "",
            options.name ?? "",
            options.onChange
          )
        : buildRadios(
            uuid,
            list,
            value ?? "",
            options.name ?? "",
            options.onChange
          )
  });
}
