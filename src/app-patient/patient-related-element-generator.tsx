import React from "react";
import PatientRelated from "../business/abstracts/patient-related";

import Folder from "../business/folder";
import type { BusinessType } from "../config";
import { Modes, type ModesList } from "../widget/io-abstract";
import FilePanel, { type FolderUpdateCallback } from "./blocs/file-panel";

export type PatientRelatedElementGeneratorProps = {
  folder: Folder;
  selectedUid?: string;
  onUpdate: FolderUpdateCallback;
  mode: ModesList;
};

export default function patientRelatedElementGenerator<
  T extends PatientRelated
>(
  file: T,
  {
    type,
    folder,
    selectedUid,
    onUpdate,
    mode
  }: PatientRelatedElementGeneratorProps & { type: BusinessType },
  elements: {
    header: React.ReactNode;
    body: React.ReactNode;
    footer?: React.ReactNode;
  }
): React.ReactNode {
  return (
    <FilePanel
      selfUrl={`/patient/${folder.id}`}
      type={type}
      folder={folder}
      key={`${type}.${file.id ?? "add"}`}
      closed={`${type}.${file.id ?? "add"}` !== selectedUid}
      file={file}
      onUpdate={onUpdate}
      header={elements.header}
      footer={elements.footer}
      edit={
        `${type}.${file.id ?? "add"}` == selectedUid
          ? mode === Modes.input
          : false
      }
    >
      {elements.body}
    </FilePanel>
  );
}
