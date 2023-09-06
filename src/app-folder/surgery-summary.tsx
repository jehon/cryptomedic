import React from "react";
import Button from "react-bootstrap/Button";

import Folder from "../business/folder";
import Surgery from "../business/surgery";

import TwoColumns from "../widget/two-columns";
import Panel from "../widget/panel";
import IO from "../widget/io";
import { icons } from "../config";
import { date2HumanString, normalizeDate } from "../utils/date";

export default function SurgerySummary({
  file,
  folder
}: {
  file: Surgery;
  folder: Folder;
}): React.ReactNode {
  if (!folder) {
    return <div>No folder selected</div>;
  }
  if (!file) {
    return <div>No file selected</div>;
  }
  return (
    <Panel
      headers={[
        <img src={icons.models.surgery} alt="Picture" className="inline" />,
        <span className="no-mobile">Surgery</span>,
        <span>{date2HumanString(normalizeDate(file.date))}</span>,
        <span>{file.report_diagnostic}</span>,
        <span>{file.report_surgeon}</span>
      ]}
    >
      <Button
        href={"#/folder/" + folder.getId() + "/file/Surgery/" + file.getId()}
        variant="outline-info"
        style={{ width: "100%" }}
      >
        View
      </Button>
      <TwoColumns>
        <Panel fixed label="Informations">
          <IO.Date label="Date" value={file.date as Date} />
          <IO.Text
            label="Comments"
            value={file.follow_up_complication as string}
          />
        </Panel>
        <Panel fixed label="Report">
          <IO.String label="File" value={file.report_diagnostic as string} />
          <IO.String label="File" value={file.report_surgeon as string} />
          <IO.String label="File" value={file.report_side_right as string} />
          <IO.String label="File" value={file.report_side_left as string} />
          <IO.String label="File" value={file.report_procedure as string} />
        </Panel>
      </TwoColumns>
    </Panel>
  );
}
