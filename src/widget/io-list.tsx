import { toTitleCase } from "../utils/strings";
import { StringList } from "../utils/types";
import IOAbstract, { IOProps } from "./io-abstract";

export type IOListType = string[] | Record<string, string>;

export function optionalList(list: string[]): IOListType {
  return {
    ...canonizeList(list),
    "": "Unknown"
  };
}

// In other part of the application, it could be a mapping
// Ex: io-boolean, search panels
function canonizeList(list: IOListType): Record<string, string> {
  if (Array.isArray(list)) {
    list = list.reduce((acc, k) => ({ ...acc, [k]: toTitleCase(k) }), {});
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

function buildRadios(
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
  props: { list: IOListType } & IOProps<StringList>
) {
  const list: Record<string, string> = canonizeList(props.list);

  if (props.value && props.onChange && !(props.value in list)) {
    // We have a value that is not in the list,
    // so we trigger the change of value
    setTimeout(() => props.onChange!(""), 1);
  }

  return IOAbstract<string>(
    {
      ...props,
      required: true
    },
    {
      renderOutput: (value) => <div>{value}</div>,
      renderInput: (value, uuid) =>
        Object.keys(list).length == 0 ? (
          <div>Not applicable</div>
        ) : Object.keys(list).length > 4 ? (
          buildSelect(uuid, list, value ?? "", props.name ?? "", props.onChange)
        ) : (
          buildRadios(uuid, list, value ?? "", props.name ?? "", props.onChange)
        )
    }
  );
}
