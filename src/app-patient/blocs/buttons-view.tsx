import { useNavigate } from "react-router-dom";
import type { BusinessType } from "../../config";
import ActionButton from "../../widget/action-button";
import ActionConfirm from "../../widget/action-confirm";
import notification from "../../widget/notification";
import { CrudLoader } from "../loaders";
import type { Pojo } from "../objects";

export type ButtonContext = {
  selfUrl: string;
  apiRootUrl: string;
  type: BusinessType;
  title: string;
  editMode: boolean;
};

export default function ButtonsView<T extends Pojo>(
  props: ButtonContext & {
    file: T;
    onUpdated: (file: T) => void;
    canBeLocked: boolean;
  }
) {
  const navigate = useNavigate();
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
      .then(props.onUpdated)
      .then(() => navigate(`${props.selfUrl}/edit`));
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

  if (props.editMode) {
    return <></>;
  }

  return (
    <ActionButton
      style="Edit"
      onOk={() => navigate(`${props.selfUrl}/edit`)}
      requires="folder.edit"
    />
  );
}
