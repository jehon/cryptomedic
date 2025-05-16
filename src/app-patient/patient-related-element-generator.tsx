import type { Patient, PatientRelated } from "./objects";

// TODO: remove this and replace by a function to calculate something

export type RelatedElementGeneratorProps<T extends PatientRelated | Patient> = {
  file: T;
  closed: boolean;
  edit: boolean;
  onCreated: (file: PatientRelated) => void;
  onDeleted: (file: PatientRelated) => void;
  onUpdated: (file: PatientRelated) => void;
};
