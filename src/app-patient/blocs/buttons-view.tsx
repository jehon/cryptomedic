import { useNavigate } from "react-router-dom";
import type Pojo from "../../business/abstracts/pojo";
import type { BusinessType } from "../../config";
import ActionButton from "../../widget/action-button";
import ActionConfirm from "../../widget/action-confirm";
import notification from "../../widget/notification";
import { folderFileUnlock } from "../loaders";

export type ButtonContext = {
  parentUrl: string;
  type: BusinessType;
  title: string;
  editMode: boolean;
  canDelete: boolean;
  isLocked: boolean;
};

export default function ButtonsView<T extends Pojo>(
  props: ButtonContext & {
    file: T;
    onUpdate: (file: T) => void;
  }
) {
  const navigate = useNavigate();
  const doUnlock = () => {
    folderFileUnlock(props.file)
      .then(notification("File unlocked"))
      .then(props.onUpdate)
      .then(() =>
        navigate(`${props.parentUrl}/${props.type}/${props.file.id!}/edit`)
      );
  };

  if (props.isLocked) {
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
      onOk={() =>
        navigate(`${props.parentUrl}/${props.type}/${props.file.id!}/edit`)
      }
      requires="folder.edit"
    />
  );
}
