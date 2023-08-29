import React from "react";

import ConsultClubfoot from "../business/club-foot";
import Folder from "../business/folder";

import Button from "react-bootstrap/Button";

import { icons } from "../../config";
import "../../styles/x-style-collapsible";
import "../../styles/x-style-panel";
import IODate from "../../widget/io-date";
import IOString from "../../widget/io-string";
import { date2HumanString, normalizeDate } from "../../utils/date";

export default function ConsultClubfootSummary({
  file,
  folder
}: {
  file: ConsultClubfoot;
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
        src={icons.models.consult_clubfoot}
        alt="Clubfoot"
        className="inline"
      />
      <span slot="header" className="no-mobile">
        Clubfoot Consult
      </span>
      <span slot="header">{date2HumanString(normalizeDate(file.date))}</span>
      <Button
        href={"#/folder/" + folder.getId() + "/file/ClubFoot/" + file.getId()}
        variant="outline-info"
        style={{ width: "100%" }}
      >
        View
      </Button>
      <div className="columns">
        <x-style-panel label="Informations">
          <IODate label="Date" value={file.date as Date} />
          <IOString label="Center" value={file.center as string} />
          <IOString label="Examiner" value={file.examiner as string} />
        </x-style-panel>
        <x-style-panel label="Details"></x-style-panel>
      </div>
    </x-style-collabsible>
  );
}
