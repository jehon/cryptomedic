import React from "react";

import Folder from "../business/folder";
import Surgery from "../business/surgery";

import FilePanel from "./blocs/file-panel";
import TwoColumns from "../widget/two-columns";
import Panel from "../widget/panel";
import IO from "../widget/io";

export default function SurgeryElement({
  file,
  folder,
  opened
}: {
  file: Surgery;
  folder: Folder;
  opened?: boolean;
}): React.ReactNode {
  return (
    <FilePanel
      closed={!opened}
      file={file}
      folder={folder}
      header={
        <>
          <span>{file.report_diagnostic}</span>
          <span>{file.report_surgeon}</span>
        </>
      }
    >
      <TwoColumns>
        <Panel fixed label="Informations">
          <IO.Date label="Date" value={file.date as Date} />
          <IO.Text
            label="Comments"
            value={file.follow_up_complication as string}
          />
        </Panel>
        <Panel fixed label="Report">
          <IO.String label="File" value={file.report_diagnostic as string} />
          <IO.String label="File" value={file.report_surgeon as string} />
          <IO.String label="File" value={file.report_side_right as string} />
          <IO.String label="File" value={file.report_side_left as string} />
          <IO.String label="File" value={file.report_procedure as string} />
        </Panel>
      </TwoColumns>
    </FilePanel>
  );
}
