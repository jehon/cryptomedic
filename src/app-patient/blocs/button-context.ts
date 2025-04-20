import type PatientRelated from "../../business/abstracts/patient-related";
import type Folder from "../../business/folder";

export type ButtonContext = {
  folder: Folder; // TODO: remove
  staticType: typeof PatientRelated; // TODO: remove
  title: string;
  migrationUrlHash: string; // TODO: remove
  editMode: boolean;
  canDelete: boolean;
  isLocked: boolean;
};
