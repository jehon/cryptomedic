import Folder from "../business/folder";
import type { BusinessType } from "../config";
import { Modes, type ModesList } from "../widget/io-abstract";
import type { Patient, PatientRelated } from "./objects";

// TODO: remove this and replace by a function to calculate something

export type PatientRelatedElementGeneratorProps<
  T extends PatientRelated | Patient
> = {
  file: T;
  patient: Patient;
  folder: Folder; // TODO: folder2patient
  selectedUid: string;
  onUpdate: (folder: Folder | undefined) => void;
  mode: ModesList;
};

type PatientRelatedElementCommonProps<T extends PatientRelated> = {
  selfUrl: string;
  apiRootUrl: string;
  closed: boolean;
  edit: boolean;
  onCreated: (file: T) => void;
  onDeleted: (file: T) => void;
  onUpdated: (file: T) => void;
};

// TODO: Move to folder-element
export function patientRelatedPropsGenerator<T extends PatientRelated>(
  props: {
    type: BusinessType;
  } & PatientRelatedElementGeneratorProps<T>
): PatientRelatedElementCommonProps<T> {
  const uid = `${props.type}.${props.file.id ?? "add"}`;

  return {
    selfUrl: `/patient/${props.patient.id}/${props.type}/${props.file.id ?? "add"}`,
    apiRootUrl: `fiche/${props.type}`, // No leading slash!
    closed: uid !== props.selectedUid,
    onCreated: (file: T) => {
      props.onUpdate(props.folder.withFile(file as unknown as PatientRelated));
    },
    onDeleted: (file: T) =>
      props.onUpdate(
        props.folder.withoutFile(file as unknown as PatientRelated)
      ),
    onUpdated: (file: T) =>
      props.onUpdate(props.folder.withFile(file as unknown as PatientRelated)),
    edit: uid == props.selectedUid ? props.mode === Modes.input : false
  };
}
