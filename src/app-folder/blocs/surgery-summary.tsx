import React from "react";
import Button from "react-bootstrap/Button";

import { icons } from "../../config";
import "../../styles/x-style-collapsible";
import "../../styles/x-style-panel";
import IODate from "../../widget/io-date";
import IOString from "../../widget/io-string";
import IOText from "../../widget/io-text";
import Folder from "../business/folder";
import { date2HumanString, normalizeDate } from "../../utils/date";
import Surgery from "../business/surgery";

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
    <x-style-collabsible opened="1">
      <img
        slot="header"
        src={icons.models.surgery}
        alt="Picture"
        className="inline"
      />
      <span slot="header" className="no-mobile">
        Picture
      </span>
      <span slot="header">{date2HumanString(normalizeDate(file.date))}</span>
      <span slot="header">{file.report_diagnostic}</span>
      <span slot="header">{file.report_surgeon}</span>
      <Button
        href={"#/folder/" + folder.getId() + "/surgery/" + file.getId()}
        variant="outline-info"
        style={{ width: "100%" }}
      >
        View
      </Button>
      <div className="columns">
        <x-style-panel label="Informations">
          <IODate label="Date" value={file.date as Date} />
          <IOText
            label="Comments"
            value={file.follow_up_complication as string}
          />
        </x-style-panel>
        <x-style-panel label="Report">
          <IOString label="File" value={file.report_diagnostic as string} />
          <IOString label="File" value={file.report_surgeon as string} />
          <IOString label="File" value={file.report_side_right as string} />
          <IOString label="File" value={file.report_side_left as string} />
          <IOString label="File" value={file.report_procedure as string} />
        </x-style-panel>
      </div>
    </x-style-collabsible>
  );
}
