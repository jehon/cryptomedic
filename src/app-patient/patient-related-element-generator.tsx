import type { Patient, PatientRelated } from "./_objects";

// TODO: remove this and replace by a function to calculate something

export type RelatedElementGeneratorProps<T extends PatientRelated | Patient> = {
  file: T;
  closed: boolean;
  edit: boolean;
  parentPath: string;
  onCreated: (file: PatientRelated) => void;
  onDeleted: (file: PatientRelated) => void;
  onUpdated: (file: PatientRelated) => void;
};
