import React, { useContext } from "react";
import { EditContext, type IOProps } from "../../widget/io-abstract";
import IONumber from "../../widget/io-number";
import "./io-bill-line.css";

export type BillLine = {
  id: string;
  key: string;
  category: string;
  value: number;
  price: number;
  total?: number;
};

export default function IOBillLine(
  props: {
    value: BillLine;
  } & IOProps<BillLine>
): React.ReactNode {
  const edit = useContext(EditContext);

  // Hide if not value and output mode
  if (!edit && !props.value.value) {
    return;
  }

  const getTotal = (value: number = props.value.value) =>
    Math.max(props.value.price * value, 0);

  const onChange = (value: number = props.value.value) => {
    if (props.onChange) {
      props.onChange({
        ...(props.value as BillLine),
        value: value,
        total: getTotal(value)
      });
    }
  };

  // Trigger initial state to update totals
  if (getTotal() > 0) onChange();

  return IONumber({
    type: "bill-line",
    name: props.value.key,
    value: props.value.value,
    precision: 0,
    appendix: `${props.value.price}৳`,
    htmlProps: { style: { width: "5em" } },
    onChange
  });
}
