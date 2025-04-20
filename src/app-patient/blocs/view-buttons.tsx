import PatientRelated from "../../business/abstracts/patient-related";
import { routeTo } from "../../main";
import ActionButton from "../../widget/action-button";
import notification from "../../widget/notification";
import { folderFileUnlock } from "../loaders";
import { patientRouterToFile } from "../patient-router";
import { isTodoMigration } from "./file-panel";

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
  const goEdit = () => {
    if (
      // TODO: migrate all this progressively
      isTodoMigration(context.staticType)
    ) {
      location.hash = `${context.migrationUrlHash}/${file.id!}/edit`;
      return;
    }

    routeTo(
      patientRouterToFile(
        context.folder.id!,
        context.staticType,
        file.id!,
        "edit"
      )
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
