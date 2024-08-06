import React from "react";

import Appointment from "../business/appointment";
import Folder from "../business/folder";

import IO from "../widget/io";
import Panel from "../widget/panel";
import TwoColumns from "../widget/two-columns";
import FilePanel, { FolderUpdateCallback } from "./blocs/file-panel";

export default function AppointmentElement({
  file,
  folder,
  opened,
  onUpdate
}: {
  file: Appointment;
  folder: Folder;
  opened?: boolean;
  onUpdate: FolderUpdateCallback;
}): React.ReactNode {
  return (
    <FilePanel
      closed={!opened}
      file={file}
      folder={folder}
      onUpdate={onUpdate}
      header={<span>{file.center}</span>}
    >
      <TwoColumns>
        <Panel fixed label="Information">
          <IO.Date label="Date" value={file.date} />
          <IO.String label="Center" value={file.center as string} />
        </Panel>
        <Panel fixed label="Objective">
          <IO.Text label="Purpose" value={file.purpose as string} />
        </Panel>
      </TwoColumns>
    </FilePanel>
  );
}
