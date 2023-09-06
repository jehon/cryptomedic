import React from "react";
import Button from "react-bootstrap/Button";

import Folder from "../business/folder";
import Surgery from "../business/surgery";

import TwoColumns from "../widget/two-columns";
import Panel from "../widget/panel";
import IO from "../widget/io";
import { icons } from "../config";
import "../styles/x-style-collapsible";
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
    <x-style-collabsible>
      <img
        slot="header"
        src={icons.models.surgery}
        alt="Picture"
        className="inline"
      />
      <span slot="header" className="no-mobile">
        Surgery
      </span>
      <span slot="header">{date2HumanString(normalizeDate(file.date))}</span>
      <span slot="header">{file.report_diagnostic}</span>
      <span slot="header">{file.report_surgeon}</span>
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
    </x-style-collabsible>
  );
}
