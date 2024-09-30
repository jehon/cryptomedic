import { useContext } from "react";
import generateUUID from "../../utils/generate-uuid";
import { toTitleCase } from "../../utils/strings";
import { EditContext } from "../../widget/io-abstract";
import "../../widget/io.css";

export type BillLine = {
  id: string;
  key: string;
  category: string;
  value: number;
  price: number;
};

export default function IOBillLine(props: { line: BillLine }): React.ReactNode {
  const edit = useContext(EditContext);

  // Hide if not value and output mode
  if (!edit && !props.line.value) {
    return null;
  }

  const uuid = generateUUID();
  const label = toTitleCase(props.line.key ?? "euh");
  return (
    <div
      className={"io " + (edit ? "io-input" : "io-output")}
      data-role={label}
      key={props.line.key}
    >
      <label htmlFor={uuid}>{label}*</label>
      <div className="content">{props.line.value}</div>
      <div className="annexe">{props.line.price} €</div>
    </div>
  );
}
