import React, { useContext } from "react";
import { EditContext } from "../../widget/io-abstract";
import IONumber from "../../widget/io-number";
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
    return;
  }

  return IONumber({
    name: props.line.key,
    value: props.line.value,
    precision: 0,
    appendix: <div>{props.line.price} ৳</div>,
    htmlProps: { size: 5, style: { width: "5em" } }
  });
}
