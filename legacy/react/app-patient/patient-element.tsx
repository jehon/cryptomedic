import React from "react";

import Folder from "../business/folder";
import Patient from "../business/patient";

import IO from "../widget/io";
import Panel from "../widget/panel";
import TwoColumns from "../widget/two-columns";
import FilePanel, { FolderUpdateCallback } from "./blocs/file-panel";

export default function PatientElement({
  file,
  folder,
  opened,
  onUpdate
}: {
  file: Patient;
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
          <span>
            {file.entry_year}-{file.entry_order}
          </span>
          <span className="no-mobile">{file.name}</span>
          <span className="no-mobile">{file.year_of_birth}</span>
        </>
      }
    >
      <>
        <TwoColumns>
          <Panel fixed label="Identification">
            <IO.Number name="entry_year" value={file.entry_year} />
            <IO.Number name="entry_order" value={file.entry_order} />
            <IO.String name="name" value={file.name} />
            <IO.String name="sex" value={file.sex} />
            <IO.Number name="year_of_birth" value={file.year_of_birth} />
            <IO.String
              label="Age today"
              value={file.actualAge() as string}
              variable
            />
            <IO.String name="pathology" value={file.pathology} />
            <IO.Text name="comments" value={file.comments} />
          </Panel>
          <Panel fixed label="Address">
            <IO.String name="phone" value={file.phone} width={1} />
            <IO.String
              name="address_district"
              label="District"
              value={file.address_district}
            />
            <IO.String
              name="address_union"
              label="Union"
              value={file.address_union}
            />
            <IO.String
              name="address_upazilla"
              label="Upazilla"
              value={file.address_upazilla}
            />
            <IO.String name="address_comments" value={file.address_comments} />
          </Panel>
        </TwoColumns>
      </>
    </FilePanel>
  );
}
