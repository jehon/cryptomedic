import { useState } from "react";
import Bill from "../business/bill";

import Payment from "../business/payment";
import ButtonsGroup from "../styles/buttons-group";
import { getList } from "../utils/config";
import { roundTo } from "../utils/strings";
import ActionButton from "../widget/action-button";
import IO from "../widget/io";
import IODate from "../widget/io-date";
import IONumber from "../widget/io-number";
import IOString from "../widget/io-string";
import Panel from "../widget/panel";
import TwoColumns from "../widget/two-columns";
import "./bill-element.css";
import IOBillLine, { type BillLine } from "./blocs/io-bill-line";
import patientRelatedElementGenerator, {
  type PatientRelatedElementGeneratorProps
} from "./patient-related-element-generator";

export default function billElementGenerator(
  file: Bill,
  props: PatientRelatedElementGeneratorProps
) {
  const [currentBill, setCurrentBill] = useState(
    file.items
      .filter((value) => value.value > 0)
      .reduce(
        (acc, value) => acc.set(value.key, value),
        new Map<string, BillLine>()
      )
  );

  const getTotal = () =>
    Array.from(currentBill)
      .map((rec) => rec[1])
      .reduce((acc, val) => (acc += val.value * val.price), 0);

  const updateTotal = (value: BillLine) => {
    const newBill = new Map(currentBill);
    newBill.set(value.key, value);
    setCurrentBill(newBill);
  };

  return patientRelatedElementGenerator<Bill>(file, props, {
    header: (
      <>
        <span>total: {file.total_real}</span>
        <span>paid: {file.getTotalAlreadyPaid()}</span>
      </>
    ),
    body: (
      <>
        <TwoColumns>
          <Panel fixed label="Information">
            <IO.Date name="date" value={file.date} />
            <IO.List
              name="examiner"
              value={file.examiner as string}
              list={getList("Examiners")}
            />
            <IO.List
              name="center"
              value={file.center as string}
              list={getList("Centers")}
            />{" "}
          </Panel>
          <Panel fixed label="Totals">
            <IO.Number
              name="sl_family_salary"
              label="Family Salary"
              value={file.sl_family_salary as number}
              // onChange={(value) => {}
            />
            <IO.Number
              name="sl_number_of_household_members"
              label="Number of Household Members"
              value={file.sl_number_of_household_members as number}
              htmlProps={{ max: 10 }}
              // onChange={(value) => {}
            />
            <IO.Number name="social_level" value={file.social_level} />
            <IO.Hidden
              name="total_real"
              label="Raw Calculated Total"
              value={getTotal()}
            />
            <IO.Number
              name="total_asked"
              label="Price asked"
              value={file.total_asked}
            />
            <IO.Function
              label="Payments Received (see below)"
              value={() => roundTo(file.getTotalAlreadyPaid(), 0)}
            />
          </Panel>
        </TwoColumns>
        <Panel fixed label="Bill Lines">
          {file.items.map((line) => (
            <IOBillLine
              value={line}
              key={line.key}
              onChange={(bl) => updateTotal(bl)}
            />
          ))}
        </Panel>
      </>
    ),
    footer: (
      <>
        <Panel fixed label="Payments" testid={file.uid() + ".payments"}>
          <ButtonsGroup>
            <ActionButton
              style="Add"
              linkTo={`#/folder/${file.getParentId()}/file/Bill/${file.getId()}`}
            />
            <ActionButton
              style="Edit"
              linkTo={`#/folder/${file.getParentId()}/file/Bill/${file.getId()}`}
            />
          </ButtonsGroup>
          {file.getPayments().length == 0 ? (
            <div>No payment received</div>
          ) : (
            file.getPayments().map((payment: Payment) => (
              <div
                key={payment.uid()}
                className="payment-line"
                data-testid={payment.uid()}
              >
                <IODate value={payment.date} noLabel />
                <IONumber value={payment.amount} noLabel />
                <IOString value={payment.comments} noLabel />
              </div>
            ))
          )}
        </Panel>
      </>
    )
  });
}
