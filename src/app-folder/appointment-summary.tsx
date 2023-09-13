import React from "react";

import Folder from "../business/folder";
import Appointment from "../business/appointment";

import FilePanel from "./blocs/file-panel";
import TwoColumns from "../widget/two-columns";
import Panel from "../widget/panel";
import IO from "../widget/io";

export default function AppointmentSummary({
  file,
  folder
}: {
  file: Appointment;
  folder: Folder;
}): React.ReactNode {
  return (
    <FilePanel
      closed
      file={file}
      folder={folder}
      headers={<span>{file.center}</span>}
    >
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
    </FilePanel>
  );
}
