import React from "react";
import Button from "react-bootstrap/Button";

import Folder from "../business/folder";
import Picture from "../business/picture";

import Panel from "../widget/panel";
import IO from "../widget/io";
import { icons } from "../config";
import "../styles/x-style-collapsible";
import { date2HumanString, normalizeDate } from "../utils/date";

export default function PictureSummary({
  file,
  folder
}: {
  file: Picture;
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
        src={icons.models.picture}
        alt="Picture"
        className="inline"
      />
      <span slot="header" className="no-mobile">
        Picture
      </span>
      <span slot="header">{file.type}</span>
      <span slot="header">{date2HumanString(normalizeDate(file.date))}</span>
      <Button
        href={"#/folder/" + folder.getId() + "/file/Picture/" + file.getId()}
        variant="outline-info"
        style={{ width: "100%" }}
      >
        View
      </Button>
      <div className="columns">
        <Panel fixed label="Informations">
          <IO.String label="Type" value={file.type as string} />
          <IO.Date label="Date" value={file.date as Date} />
          <IO.String label="File" value={file.file as string} />
          <IO.Text label="Comments" value={file.comments as string} />
        </Panel>
        <Panel fixed label="Image">
          <img src={file.getThumbnailUrl() as string} alt="Content" />
        </Panel>
      </div>
    </x-style-collabsible>
  );
}
