import PatientRelated from "../../business/abstracts/patient-related";
import { routeTo } from "../../main";
import ActionButton from "../../widget/action-button";
import ActionConfirm from "../../widget/action-confirm";
import notification from "../../widget/notification";
import { folderFileDelete } from "../loaders";
import {
  Modes,
  patientRouterToFile,
  patientRouterToPatient
} from "../patient-router";

import type { ButtonContext } from "./button-context";

export default function EditButtons({
  file,
  onDelete,
  // onUpdate,
  context
  // formRef
}: {
  file: PatientRelated;
  onDelete: () => void;
  onUpdate: (file: PatientRelated) => void;
  context: ButtonContext;
  formRef: React.RefObject<HTMLFormElement | null>;
}) {
  if (!context.editMode) {
    return <></>;
  }

  const addMode = !file.id;

  const doDelete = () =>
    folderFileDelete(file).then(notification("File deleted")).then(onDelete);

  const doCancel = () => {
    if (addMode) {
      // // This is not necessary because the top folder will reload anyway
      // // Remove the newly added file, that we don't want to keep
      // onUpdate(folder.withoutFile(file));
      routeTo(patientRouterToPatient(context.folder.id!, Modes.output));
    } else {
      routeTo(
        patientRouterToFile(
          context.folder.id!,
          context.staticType,
          file.id!,
          Modes.output
        )
      );
    }
  };

  return (
    <>
      {context.canDelete && (
        <ActionConfirm
          style="Delete"
          discrete={true}
          onOk={doDelete}
          requires="folder.delete"
        >
          <div>Are you sure you want to DELETE the File {context.title}?</div>
        </ActionConfirm>
      )}
      <ActionButton style="Cancel" onOk={() => doCancel()} />
    </>
  );
}
