import React from "react";
import Button from "react-bootstrap/Button";

import Folder from "../business/folder";
import Bill from "../business/bill";

import Panel from "../widget/panel";
import IO from "../widget/io";
import { icons } from "../config";
import "../styles/x-style-collapsible";
import { date2HumanString, normalizeDate } from "../utils/date";

export default function BillSummary({
  file,
  folder
}: {
  file: Bill;
  folder: Folder;
}): React.ReactNode {
  if (!folder) {
    return <div>No folder selected</div>;
  }
  if (!file) {
    return <div>No file selected</div>;
  }
  return (
    <x-style-collabsible opened="1">
      <img
        slot="header"
        src={icons.models.bill}
        alt="Bill"
        className="inline"
      />
      <span slot="header" className="no-mobile">
        Bill
      </span>
      <span slot="header">{date2HumanString(normalizeDate(file.date))}</span>
      <Button
        href={"#/folder/" + folder.getId() + "/file/Bill/" + file.getId()}
        variant="outline-info"
        style={{ width: "100%" }}
      >
        View
      </Button>
      <div className="columns">
        <Panel fixed label="Informations">
          <IO.Date label="Date" value={file.date as Date} />
          <IO.String label="Center" value={file.center as string} />
          <IO.String label="Examiner" value={file.examiner as string} />
        </Panel>
        <Panel label="Details">blablabla</Panel>
      </div>
    </x-style-collabsible>
  );
}
