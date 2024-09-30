import Bill from "../business/bill";

import Payment from "../business/payment";
import ButtonsGroup from "../styles/buttons-group";
import { roundTo } from "../utils/strings";
import ActionButton from "../widget/action-button";
import IO from "../widget/io";
import IODate from "../widget/io-date";
import IONumber from "../widget/io-number";
import IOString from "../widget/io-string";
import Panel from "../widget/panel";
import TwoColumns from "../widget/two-columns";
import "./bill-element.css";
import IOBillLine from "./blocs/io-bill-line";
import patientRelatedElementGenerator, {
  PatientRelatedElementGeneratorProps
} from "./patient-related-element-generator";

export default function billElementGenerator(
  file: Bill,
  props: PatientRelatedElementGeneratorProps
) {
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
            <IO.String name="examiner" value={file.examiner as string} />
            <IO.String name="center" value={file.center as string} />
          </Panel>
          <Panel fixed label="Totals">
            <IO.Number
              name="sl_family_salary"
              label="Family Salary"
              value={file.sl_family_salary as number}
            />
            <IO.Number
              name="sl_number_of_household_members"
              label="Number of Houslehold Members"
              value={file.sl_number_of_household_members as number}
            />
            <IO.Function
              label="Salary Ratio"
              value={() => roundTo(file.ratioSalary(), 0)}
            />
            <IO.Function
              label="Social Level (calculated)"
              value={() => roundTo(file.social_level_calculated(), 0)}
            />
            <IO.Function
              label="Raw Calculated Total"
              value={() => roundTo(file.total_real, 0)}
            />
            <IO.Function
              label="Percentage asked"
              value={() => roundTo(file.get_percentage_asked(), 0)}
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
            <IOBillLine line={line} price={file.getPriceFor(line.id)} />
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
              linkTo={`#/folder/${file.getParent().getId()}/file/Bill/${file.getId()}`}
            />
            <ActionButton
              style="Edit"
              linkTo={`#/folder/${file.getParent().getId()}/file/Bill/${file.getId()}`}
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
