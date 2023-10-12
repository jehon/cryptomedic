import React from "react";

import Folder from "../business/folder";
import Bill from "../business/bill";

import FilePanel from "./blocs/file-panel";
import TwoColumns from "../widget/two-columns";
import Panel from "../widget/panel";
import IO from "../widget/io";
import { roundTo } from "../utils/strings";
import Payment from "../business/payment";

export default function BillElement({
  file,
  folder,
  opened
}: {
  file: Bill;
  folder: Folder;
  opened?: boolean;
}): React.ReactNode {
  return (
    <FilePanel
      closed={!opened}
      file={file}
      folder={folder}
      header={
        <>
          <span>total: {file.total_real}</span>
          <span>paid: {file.getTotalAlreadyPaid()}</span>
        </>
      }
    >
      <TwoColumns>
        <Panel fixed label="Informations">
          <IO.Date label="Date" value={file.date as Date} />
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
            label="Received"
            value={() => roundTo(file.getTotalAlreadyPaid(), 0)}
          />
        </Panel>
      </TwoColumns>
      <Panel label="Bill Lines">
        {file.items.map((line) => {
          return (
            <IO.Number key={line.key} label={line.key} value={line.value} />
          );
        })}
      </Panel>
      <Panel label="Payments">
        {file.getPayments().map((payment: Payment) => {
          return (
            <IO.Number
              key={payment.uid()}
              label={payment.date}
              value={payment.amount}
            />
          );
        })}
      </Panel>
    </FilePanel>
  );
}
