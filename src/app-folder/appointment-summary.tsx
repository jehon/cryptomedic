import React from "react";
import Button from "react-bootstrap/Button";

import Folder from "../business/folder";
import Appointment from "../business/appointment";

import Panel from "../widget/panel";
import IO from "../widget/io";
import { icons } from "../config";
import "../styles/x-style-collapsible";
import { date2HumanString, normalizeDate } from "../utils/date";

export default function AppointmentSummary({
  file,
  folder
}: {
  file: Appointment;
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
        src={icons.models.appointment}
        alt="Appointment"
        className="inline"
      />
      <span slot="header" className="no-mobile">
        Appointment
      </span>
      <span slot="header">{date2HumanString(normalizeDate(file.date))}</span>
      <span slot="header">{file.center}</span>
      <Button
        href={
          "#/folder/" + folder.getId() + "/file/Appointment/" + file.getId()
        }
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
        <Panel fixed label="Objective">
          <IO.Text label="Purpose" value={file.purpose as string} />
        </Panel>
      </div>
    </x-style-collabsible>
  );
}
