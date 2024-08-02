import React from "react";

import Folder from "../business/folder";
import Surgery from "../business/surgery";

import IO from "../widget/io";
import Panel from "../widget/panel";
import TwoColumns from "../widget/two-columns";
import FilePanel, { FolderUpdateCallback } from "./blocs/file-panel";

export default function SurgeryElement({
  file,
  folder,
  opened,
  onUpdate
}: {
  file: Surgery;
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
      header={
        <>
          <span>{file.report_diagnostic}</span>
          <span>{file.report_surgeon}</span>
        </>
      }
    >
      <TwoColumns>
        <Panel fixed label="Report">
          <IO.Date name="date" value={file.date} />
          <IO.String
            name="report_diagnostic"
            label="Diagnostic"
            value={file.report_diagnostic as string}
          />
          <IO.String
            name="report_surgeon"
            label="Surgeon"
            value={file.report_surgeon as string}
          />
          <IO.String
            name="report_side_right"
            label="Side Right"
            value={file.report_side_right as string}
          />
          <IO.String
            name="report_side_left"
            label="Side Left"
            value={file.report_side_left as string}
          />
          <IO.String
            name="report_procedure"
            label="Procedure"
            value={file.report_procedure as string}
          />
        </Panel>
        <Panel fixed label="Hospitalization Follow-up">
          <IO.Text
            name="follow_up_complication"
            label="Follow-Up Complications"
            value={file.follow_up_complication as string}
          />
        </Panel>
      </TwoColumns>
    </FilePanel>
  );
}
