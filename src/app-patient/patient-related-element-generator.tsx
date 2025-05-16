import type { Patient, PatientRelated } from "./objects";

// TODO: remove this and replace by a function to calculate something

export type PatientRelatedElementGeneratorProps<
  T extends PatientRelated | Patient
> = {
  file: T;
  patient: Patient;
  closed: boolean;
  edit: boolean;
  onCreated: (file: PatientRelated) => void;
  onDeleted: (file: PatientRelated) => void;
  onUpdated: (file: PatientRelated) => void;
};
