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
  canBeDeleted: boolean;
  canBeLocked: boolean;
  elementHeader: React.ReactNode;
  elementBody: React.ReactNode;
  elementFooter?: React.ReactNode;
}): React.ReactNode {
  const uid = `${props.type}.${props.file.id ?? "add"}`;

  return (
    <FilePanel
      selfUrl={`/patient/${props.folder.id}/${props.type}/${props.file.id ?? "add"}`}
      apiRootUrl={`fiche/${props.type}`} // No leading slash!
      type={props.type}
      folder={props.folder}
      key={uid}
      closed={uid !== props.selectedUid}
      file={props.file}
      onCreated={(file: T) => {
        props.onUpdate(
          props.folder.withFileOLD(file as unknown as PatientRelated)
        );
      }}
      onDeleted={(file: T) =>
        props.onUpdate(
          props.folder.withoutFileOLD(file as unknown as PatientRelated)
        )
      }
      onUpdated={(file: T) =>
        props.onUpdate(
          props.folder.withFileOLD(file as unknown as PatientRelated)
        )
      }
      header={props.elementHeader}
      footer={props.elementFooter}
      edit={uid == props.selectedUid ? props.mode === Modes.input : false}
      canBeDeleted={props.canBeDeleted}
      canBeLocked={props.canBeLocked}
    >
      {props.elementBody}
    </FilePanel>
  );
}
