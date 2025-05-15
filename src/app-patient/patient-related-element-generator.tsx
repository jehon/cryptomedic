import React from "react";
import Folder from "../business/folder";
import type { BusinessType } from "../config";
import { Modes, type ModesList } from "../widget/io-abstract";
import FilePanel, { type FolderUpdateCallback } from "./blocs/file-panel";
import type { Patient, PatientRelated } from "./objects";

export type PatientRelatedElementGeneratorProps = {
  folder: Folder;
  selectedUid?: string;
  onUpdate: FolderUpdateCallback;
  mode: ModesList;
};

export default function patientRelatedElementGenerator<
  T extends PatientRelated | Patient
>(props: {
  file: T;
  type: BusinessType;
  folder: Folder;
  selectedUid?: string;
  onUpdate: FolderUpdateCallback;
  mode: ModesList;
  canBeLocked: boolean;
  elementHeader: React.ReactNode;
  elementBody: React.ReactNode;
  elementFooter?: React.ReactNode;
}): React.ReactNode {
  return (
    <FilePanel
      selfUrl={`/patient/${props.folder.id}/${props.type}/${props.file.id ?? "add"}`}
      apiRootUrl={`fiche/${props.type}`} // No leading slash!
      type={props.type}
      folder={props.folder}
      key={`${props.type}.${props.file.id ?? "add"}`}
      closed={`${props.type}.${props.file.id ?? "add"}` !== props.selectedUid}
      file={props.file}
      onUpdate={props.onUpdate}
      header={props.elementHeader}
      footer={props.elementFooter}
      edit={
        `${props.type}.${props.file.id ?? "add"}` == props.selectedUid
          ? props.mode === Modes.input
          : false
      }
      canBeLocked={false}
    >
      {props.elementBody}
    </FilePanel>
  );
}
