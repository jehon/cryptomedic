import React, { useContext } from "react";
import { EditContext } from "../../widget/io-abstract";
import IONumber from "../../widget/io-number";
import "./io-bill-line.css";

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
    return;
  }

  return IONumber({
    type: "bill-line",
    name: props.line.key,
    value: props.line.value,
    precision: 0,
    appendix: `${props.line.price}৳`,
    htmlProps: { style: { width: "5em" } }
  });
}
