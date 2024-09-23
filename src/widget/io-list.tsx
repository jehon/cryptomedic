import { useContext } from "react";
import { toTitleCase } from "../utils/strings";
import { StringList } from "../utils/types";
import IOAbstract, { EditContext, IOProps } from "./io-abstract";

// In other part of the application, it could be a mapping
// Ex: io-boolean, search panels
function canonizeList(
  list: string[] | Record<string, string>,
  includeUnknown: boolean = false
): Record<string, string> {
  if (Array.isArray(list)) {
    list = list.reduce((acc, k) => ({ ...acc, [k]: toTitleCase(k) }), {});
  }
  if (includeUnknown) {
    list = { ...list, "": "Unknown" };
  }

  // key: what to store
  // value: what to show
  return list;
}

function buildSelect(
  uuid: string,
  list: Record<string, string>,
  value: string,
  name: string,
  onChange: (val: string) => void = () => {}
) {
  // Select always require a selected option to be chosen
  return (
    <select
      id={uuid}
      className="form-control"
      name={name}
      defaultValue={value ?? ""}
      onChange={(evt) => onChange(evt.target.value)}
    >
      {Object.entries(list).map(([stored, shown]) => (
        <option key={shown} value={stored}>
          {shown}
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
  return Object.entries(list).map(([stored, shown], i) => (
    <div className="align" key={shown}>
      <input
        id={uuid + "." + i}
        className="form-control"
        name={name}
        defaultChecked={value == stored}
        value={stored}
        onBlur={() => onChange(stored)}
        type="radio"
        required
      />
      <label htmlFor={uuid + "." + i}>{shown}</label>
    </div>
  ));
}

export default function IOList(
  props: { list?: string[] | Record<string, string> } & IOProps<StringList>
) {
  // TODO: List should be mandatory and thus ?? {} not necessary anymore
  const edit = useContext(EditContext);
  if (!props.list && edit && props.name) {
    throw new Error(`No list in ${props.name}}`);
  }
  const list: Record<string, string> = canonizeList(
    props.list ?? {},
    !props.required
  );
  // TODO: end

  return IOAbstract<string>(props, {
    renderOutput: (value) => <div>{value}</div>,
    renderInput: (value, uuid) =>
      Object.keys(list).length > 4
        ? buildSelect(uuid, list, value ?? "", props.name ?? "", props.onChange)
        : buildRadios(uuid, list, value ?? "", props.name ?? "", props.onChange)
  });
}
