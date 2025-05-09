import PatientRelated from "../../business/abstracts/patient-related";
import ActionButton from "../../widget/action-button";
import notification from "../../widget/notification";
import { folderFileUnlock } from "../loaders";
import { isTodoMigration } from "./file-panel";

import { useNavigate } from "react-router-dom";
import ActionConfirm from "../../widget/action-confirm";
import type { ButtonContext } from "./button-context";

export default function ViewButtons({
  file,
  onUpdate,
  context
}: {
  file: PatientRelated;
  onUpdate: (file: PatientRelated) => void;
  context: ButtonContext;
}) {
  const navigate = useNavigate();
  const goEdit = () => {
    if (
      // TODO: migrate all this progressively
      isTodoMigration(context.staticType)
    ) {
      location.hash = `folder/${file.getParentId()}/file/Bill/${file.id!}/edit`;
      return;
    }

    navigate(
      `/patient/${context.folder.id!}/${context.staticType.getTechnicalName()}.${file.id!}/edit`
    );
  };

  const doUnlock = () => {
    folderFileUnlock(file)
      .then(notification("File unlocked"))
      .then(onUpdate)
      .then(() => goEdit());
  };

  if (context.isLocked) {
    return (
      <ActionConfirm
        style="Alternate"
        action="Unlock"
        discrete={true}
        onOk={() => doUnlock()}
        requires="folder.unlock"
      >
        <div>
          Are you sure you want to unlock the File {context.title}?
          <br />
          Anybody will then be able to edit it.
        </div>
      </ActionConfirm>
    );
  }

  if (context.editMode) {
    return <></>;
  }

  return (
    <ActionButton style="Edit" onOk={() => goEdit()} requires="folder.edit" />
  );
}
