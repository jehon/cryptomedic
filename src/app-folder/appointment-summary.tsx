import React from "react";
import Button from "react-bootstrap/Button";

import Folder from "../business/folder";
import Appointment from "../business/appointment";

import TwoColumns from "../widget/two-columns";
import Panel from "../widget/panel";
import IO from "../widget/io";
import { icons } from "../config";
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
    <Panel
      headers={[
        <img
          src={icons.models.appointment}
          alt="Appointment"
          className="inline"
        />,
        <span className="no-mobile">Appointment</span>,
        <span>{date2HumanString(normalizeDate(file.date))}</span>,
        <span>{file.center}</span>
      ]}
    >
      <Button
        href={
          "#/folder/" + folder.getId() + "/file/Appointment/" + file.getId()
        }
        variant="outline-info"
        style={{ width: "100%" }}
      >
        View
      </Button>
      <TwoColumns>
        <Panel fixed label="Informations">
          <IO.Date label="Date" value={file.date as Date} />
          <IO.String label="Center" value={file.center as string} />
          <IO.String label="Examiner" value={file.examiner as string} />
        </Panel>
        <Panel fixed label="Objective">
          <IO.Text label="Purpose" value={file.purpose as string} />
        </Panel>
      </TwoColumns>
    </Panel>
  );
}
