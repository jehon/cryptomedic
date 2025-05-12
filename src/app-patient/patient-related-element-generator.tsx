import React from "react";
import PatientRelated from "../business/abstracts/patient-related";

import Folder from "../business/folder";
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
  { folder, selectedUid, onUpdate, mode }: PatientRelatedElementGeneratorProps,
  elements: {
    header: React.ReactNode;
    body: React.ReactNode;
    footer?: React.ReactNode;
  }
): React.ReactNode {
  return (
    <FilePanel
      folder={folder}
      key={`${file.getStatic().getTechnicalName()}.${file.id ?? "add"}`}
      closed={
        `${file.getStatic().getTechnicalName()}.${file.id ?? "add"}` !==
        selectedUid
      }
      file={file}
      onUpdate={onUpdate}
      header={elements.header}
      footer={elements.footer}
      edit={
        `${file.getStatic().getTechnicalName()}.${file.id ?? "add"}` ==
        selectedUid
          ? mode === Modes.input
          : false
      }
    >
      {elements.body}
    </FilePanel>
  );
}
