import React from "react";

import Folder from "../business/folder";
import Picture from "../business/picture";

import FilePanel from "./blocs/file-panel";
import TwoColumns from "../widget/two-columns";
import Panel from "../widget/panel";
import IO from "../widget/io";

export default function PictureSummary({
  file,
  folder
}: {
  file: Picture;
  folder: Folder;
}): React.ReactNode {
  return (
    <FilePanel closed file={file} folder={folder}>
      <TwoColumns>
        <Panel fixed label="Informations">
          <IO.String label="Type" value={file.type as string} />
          <IO.Date label="Date" value={file.date as Date} />
          <IO.String label="File" value={file.file as string} />
          <IO.Text label="Comments" value={file.comments as string} />
        </Panel>
        <Panel fixed label="Image">
          <img src={file.getThumbnailUrl() as string} alt="Content" />
        </Panel>
      </TwoColumns>
    </FilePanel>
  );
}
