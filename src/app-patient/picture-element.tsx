import React from "react";

import Folder from "../business/folder";
import Picture from "../business/picture";

import IO from "../widget/io";
import Panel from "../widget/panel";
import TwoColumns from "../widget/two-columns";
import FilePanel, { FolderUpdateCallback } from "./blocs/file-panel";

export default function PictureElement({
  file,
  folder,
  opened,
  onUpdate
}: {
  file: Picture;
  folder: Folder;
  opened?: boolean;
  onUpdate: FolderUpdateCallback;
}): React.ReactNode {
  return (
    <FilePanel closed={!opened} file={file} folder={folder} onUpdate={onUpdate}>
      <TwoColumns>
        <Panel fixed label="Informations">
          <IO.String label="Type" value={file.type as string} />
          <IO.Date label="Date" value={file.date} />
          <IO.String label="File" value={file.file as string} />
          <IO.Text label="Comments" value={file.comments as string} />
        </Panel>
        <Panel fixed label="Image">
          <IO.Image label="Picture" value={file.getThumbnailUrl() as string} />
        </Panel>
      </TwoColumns>
    </FilePanel>
  );
}
