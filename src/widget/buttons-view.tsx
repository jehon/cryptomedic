import { CrudLoader } from "../app-patient/loaders-patient";
import type { Pojo } from "../app-patient/objects-patient";
import type { BusinessType } from "../config";
import { passThrough } from "../utils/promises";
import ActionButton from "./action-button";
import ActionConfirm from "./action-confirm";
import notification from "./notification";

export type ButtonContext<T> = {
  apiRootUrl: string;
  type: BusinessType;
  file: T;
  title: string;
  edit: boolean;
  onCreated: (file: T) => void;
  onDeleted: (file: T) => void;
  onUpdated: (file: T) => void;
  setEdit: (edit: boolean) => void;
};

export default function ButtonsView<T extends Pojo>(
  props: ButtonContext<T> & {
    file: T;
    onUpdated: (file: T) => void;
    canBeLocked: boolean;
  }
) {
  const crudLoader = new CrudLoader<T>(props.apiRootUrl, props.type);
  let isLocked = false;
  if (props.canBeLocked) {
    if (props.file.updated_at) {
      const dlock = new Date(props.file.updated_at);
      dlock.setDate(dlock.getDate() + 35);
      isLocked = dlock < new Date();
    }
  }

  const doUnlock = () => {
    crudLoader
      .unlock(props.file.id!)
      .then(notification("File unlocked"))
      .then(passThrough(() => props.setEdit(true)))
      .then(passThrough(props.onUpdated));
  };

  if (isLocked) {
    return (
      <ActionConfirm
        style="Alternate"
        action="Unlock"
        discrete={true}
        onOk={() => doUnlock()}
        requires="folder.unlock"
      >
        <div>
          Are you sure you want to unlock the File {props.title}?
          <br />
          Anybody will then be able to edit it.
        </div>
      </ActionConfirm>
    );
  }

  if (props.edit) {
    return <></>;
  }

  return (
    <ActionButton
      style="Edit"
      onOk={() => props.setEdit(true)}
      requires="folder.edit"
    />
  );
}
