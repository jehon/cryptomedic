import React from "react";

import Appointment from "../business/appointment";
import Folder from "../business/folder";

import { getList } from "../utils/config";
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
          <IO.Date name="date" value={file.date} required />
          <IO.List
            name="center"
            value={file.center as string}
            list={getList("Centers")}
          />
        </Panel>
        <Panel fixed label="Objective">
          <IO.Text name="purpose" value={file.purpose as string} />
        </Panel>
      </TwoColumns>
    </FilePanel>
  );
}
