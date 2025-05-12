import type { BusinessType } from "../../config";

export type ButtonContext = {
  parentUrl: string;
  type: BusinessType;
  title: string;
  editMode: boolean;
  canDelete: boolean;
  isLocked: boolean;
};
