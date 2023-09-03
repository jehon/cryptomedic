import React from "react";
import Button from "react-bootstrap/Button";

import { icons } from "../../config";
import "../../styles/x-style-collapsible";
import "../../styles/x-style-panel";
import IODate from "../../widget/io-date";
import IOString from "../../widget/io-string";
import IOText from "../../widget/io-text";
import Picture from "../../business/picture";
import Folder from "../../business/folder";
import { date2HumanString, normalizeDate } from "../../utils/date";

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
        <x-style-panel label="Informations">
          <IOString label="Type" value={file.type as string} />
          <IODate label="Date" value={file.date as Date} />
          <IOString label="File" value={file.file as string} />
          <IOText label="Comments" value={file.comments as string} />
        </x-style-panel>
        <x-style-panel label="Image">
          <img src={file.getThumbnailUrl() as string} alt="Content" />
        </x-style-panel>
      </div>
    </x-style-collabsible>
  );
}
