import React from "react";

import Bill from "../business/bill";
import Folder from "../business/folder";

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
import BillLine from "./blocs/bill-line";
import FilePanel, { FolderUpdateCallback } from "./blocs/file-panel";

export default function BillElement({
  file,
  folder,
  opened,
  onUpdate
}: {
  file: Bill;
  folder: Folder;
  opened?: boolean;
  onUpdate: FolderUpdateCallback;
}): React.ReactNode {
  return (
    <FilePanel
      closed={!opened}
      file={file}
      folder={folder}
      onUpdate={onUpdate}
      header={
        <>
          <span>total: {file.total_real}</span>
          <span>paid: {file.getTotalAlreadyPaid()}</span>
        </>
      }
      footer={
        <>
          <Panel label="Payments">
            <ButtonsGroup>
              <ActionButton
                style="Add"
                linkTo={`#/folder/${folder.getId()}/file/Bill/${file.getId()}`}
              />
              <ActionButton
                style="Edit"
                linkTo={`#/folder/${folder.getId()}/file/Bill/${file.getId()}`}
              />
            </ButtonsGroup>
            {file.getPayments().length == 0 ? (
              <div>No payment received</div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Comments</th>
                  </tr>
                </thead>
                <tbody>
                  {file.getPayments().map((payment: Payment) => (
                    <tr key={payment.uid()}>
                      <td>
                        <IODate value={payment.date} noLabel />
                      </td>
                      <td>
                        <IONumber value={payment.amount} noLabel />
                      </td>
                      <td>
                        <IOString value={payment.comments} noLabel note />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </Panel>
        </>
      }
    >
      <TwoColumns>
        <Panel fixed label="Information">
          <IO.Date label="Date" value={file.date} />
          <IO.String label="Examiner" value={file.examiner as string} />
          <IO.String label="Center" value={file.center as string} />
        </Panel>
        <Panel fixed label="Totals">
          <IO.Number
            label="Family Salary"
            value={file.sl_family_salary as number}
          />
          <IO.Number
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
            value={() => roundTo(file.calculate_total_real(), 0)}
          />
          <IO.Function
            label="Percentage asked"
            value={() => roundTo(file.calculate_percentage_asked(), 0)}
          />
          <IO.Number label="Price asked" value={file.total_asked} />
          <IO.Function
            label="Payments Received (see below)"
            value={() => roundTo(file.getTotalAlreadyPaid(), 0)}
          />
        </Panel>
      </TwoColumns>
      <Panel label="Bill Lines">
        {file.items.map((line) => (
          <BillLine
            key={line.key}
            name={line.key}
            value={line.value}
            price={file.getPriceFor(line.key)}
          />
        ))}
      </Panel>
    </FilePanel>
  );
}
