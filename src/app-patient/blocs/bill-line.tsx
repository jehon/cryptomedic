import React, { useContext } from "react";
import generateUUID from "../../utils/generate-uuid";
import { toTitleCase } from "../../utils/strings";
import { EditContext } from "../../widget/io-abstract";
import "../../widget/io.css";

export default function BillLine(props: {
  name: string;
  value: number;
  price: number;
}): React.ReactNode {
  // ReadOnly always prevent edit mode
  const edit = useContext(EditContext);

  // Hide if not value and output mode
  if (!edit && !props.value) {
    return null;
  }

  const uuid = generateUUID();
  const label = toTitleCase(props.name ?? "euh");
  return (
    <div
      className={"io " + (edit ? "io-input" : "io-output")}
      data-role={label}
    >
      <label htmlFor={uuid}>{label}*</label>
      <div className="content">{props.value}</div>
      <div className="annexe">{props.price} €</div>
    </div>
  );
}
