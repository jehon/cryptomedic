import React from "react";

import ConsultOther from "../business/consult-other";
import Folder from "../business/folder";

import ConsultAbstractConclusion from "./blocs/consult-abstract-conclusion";
import ConsultAbstractIntroduction from "./blocs/consult-abstract-introduction";

import IO from "../widget/io";
import Panel from "../widget/panel";
import TwoColumns from "../widget/two-columns";
import FilePanel, { FolderUpdateCallback } from "./blocs/file-panel";

export default function ConsultOtherElement({
  file,
  folder,
  opened,
  onUpdate
}: {
  file: ConsultOther;
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
      header={<>{file.side}</>}
    >
      <ConsultAbstractIntroduction file={file}></ConsultAbstractIntroduction>
      <TwoColumns>
        <Panel label="Orthopedic data">
          <IO.List name="side" value={file.side}></IO.List>
          <IO.String
            name="joints_or_bones_affected"
            label="Joints or Bones Affected"
            value={file.joints_or_bones_affected}
          ></IO.String>
          <IO.String name="deformity" value={file.deformity}></IO.String>
          <IO.String
            name="articulation_mobility"
            value={file.articulation_mobility}
          ></IO.String>
          <IO.String
            name="muscle_strength"
            value={file.muscle_strength}
          ></IO.String>
          <IO.List name="pain" value={file.pain}></IO.List>
          <IO.List name="walk" value={file.walk}></IO.List>
          <IO.String name="xray" label="XRay" value={file.xray}></IO.String>
        </Panel>
        <Panel label="Orthopedic observations">
          <IO.Text name="performed" value={file.performed}></IO.Text>
          <IO.Text name="not performed" value={file.not_performed}></IO.Text>
        </Panel>
      </TwoColumns>
      <ConsultAbstractConclusion file={file}></ConsultAbstractConclusion>
    </FilePanel>
  );
}
