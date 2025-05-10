import React from "react";
import PatientRelated from "../business/abstracts/patient-related";

import Folder from "../business/folder";
import FilePanel, { type FolderUpdateCallback } from "./blocs/file-panel";

export type PatientRelatedElementGeneratorProps = {
  folder: Folder;
  selectedUid?: string;
  onUpdate: FolderUpdateCallback;
  mode?: string;
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
  console.log("PatientRelatedElementGenerator - Debug:", {
    fileUid: file.uid(),
    selectedUid,
    mode,
    isEdit: file.uid() == selectedUid ? mode === "edit" : false
  });

  return (
    <FilePanel
      folder={folder}
      key={file.uid()}
      closed={file.uid() !== selectedUid}
      file={file}
      onUpdate={onUpdate}
      header={elements.header}
      footer={elements.footer}
      edit={file.uid() == selectedUid ? mode === "edit" : false}
    >
      {elements.body}
    </FilePanel>
  );
}
