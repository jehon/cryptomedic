import React from "react";
import PatientRelated from "../business/abstracts/patient-related";

import FilePanel, { FolderUpdateCallback } from "./blocs/file-panel";

export type PatientRelatedElementGeneratorProps = {
  selectedUid?: string;
  onUpdate: FolderUpdateCallback;
  mode?: string;
};

export default function patientRelatedElementGenerator<
  T extends PatientRelated
>(
  file: T,
  { selectedUid, onUpdate, mode }: PatientRelatedElementGeneratorProps,
  elements: {
    header: React.ReactNode;
    body: React.ReactNode;
    footer?: React.ReactNode;
  }
): React.ReactNode {
  return (
    <FilePanel
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
