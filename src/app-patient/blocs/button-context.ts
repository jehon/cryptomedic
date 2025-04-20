import type Pojo from "../../business/abstracts/pojo";
import type Folder from "../../business/folder";

export type ButtonContext = {
  folder: Folder; // TODO: remove
  staticType: typeof Pojo; // TODO: remove
  title: string;
  migrationUrlHash: string; // TODO: remove
  editMode: boolean;
  canDelete: boolean;
  isLocked: boolean;
};
