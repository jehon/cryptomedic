import React from "react";

import Folder from "../business/folder";
import Patient from "../business/patient";

import IO from "../widget/io";
import Panel from "../widget/panel";
import TwoColumns from "../widget/two-columns";
import FilePanel from "./blocs/file-panel";

export default function PatientElement({
  file,
  folder,
  opened,
  onUpdate
}: {
  file: Patient;
  folder: Folder;
  opened?: boolean;
  onUpdate: () => void;
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
            <IO.Number label="Entry Year" value={file.entry_year} />
            <IO.Number label="Entry Order" value={file.entry_order} />
            <IO.String label="Name" value={file.name} />
            <IO.String label="sex" value={file.sex} />
            <IO.Number label="Year of birth" value={file.year_of_birth} />
            <IO.String label="Age today" value={file.actualAge() as string} />
            <IO.String label="pathology" value={file.pathology} />
            <IO.Text label="Comments" value={file.comments} />
          </Panel>
          <Panel fixed label="Address">
            <IO.String width={1} label="Phone" value={file.phone} />
            <IO.String label="District" value={file.address_district} />
            <IO.String label="Union" value={file.address_union} />
            <IO.String label="Upazilla" value={file.address_upazilla} />
            <IO.String label="Address Comments" value={file.address_comments} />
          </Panel>
        </TwoColumns>
      </>
    </FilePanel>
  );
}
