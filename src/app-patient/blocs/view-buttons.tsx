import ActionButton from "../../widget/action-button";
import notification from "../../widget/notification";
import { folderFileUnlock } from "../loaders";
import { isTodoMigration } from "./file-panel";

import { useNavigate } from "react-router-dom";
import type Pojo from "../../business/abstracts/pojo";
import ActionConfirm from "../../widget/action-confirm";
import type { ButtonContext } from "./button-context";

export default function ViewButtons<T extends Pojo>(
  props: ButtonContext & {
    file: T;
    onUpdate: (file: T) => void;
  }
) {
  const navigate = useNavigate();
  const goEdit = () => {
    if (
      // TODO: migrate all this progressively
      isTodoMigration(props.type)
    ) {
      location.hash = `${props.parentUrl.replace("patient", "folder")}/file/Bill/${props.file.id!}/edit`;
      return;
    }

    navigate(`${props.parentUrl}/${props.type}/${props.file.id!}/edit`);
  };

  const doUnlock = () => {
    folderFileUnlock(props.file)
      .then(notification("File unlocked"))
      .then(props.onUpdate)
      .then(() => goEdit());
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
    <ActionButton style="Edit" onOk={() => goEdit()} requires="folder.edit" />
  );
}
