import React from "react";
import Folder from "../business/folder";
import type { BusinessType } from "../config";
import { Modes, type ModesList } from "../widget/io-abstract";
import FilePanel from "./blocs/file-panel";
import type { Patient, PatientRelated } from "./objects";

// TODO: remove this and replace by a function to calculate something

export type PatientRelatedElementGeneratorProps<
  T extends PatientRelated | Patient
> = {
  file: T;
  patient: Patient;
  folder: Folder; // TODO: folder2patient
  selectedUid?: string;
  onUpdate: (folder: Folder | undefined) => void;
  mode: ModesList;
};

export default function patientRelatedElementGenerator<
  T extends PatientRelated | Patient
>(props: {
  file: T;
  type: BusinessType;
  patient: Patient;
  folder: Folder; // TODO: folder2patient
  selectedUid?: string;
  onUpdate: (folder: Folder | undefined) => void;
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
      selfUrl={`/patient/${props.patient.id}/${props.type}/${props.file.id ?? "add"}`}
      apiRootUrl={`fiche/${props.type}`} // No leading slash!
      type={props.type}
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
