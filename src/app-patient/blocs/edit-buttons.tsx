import PatientRelated from "../../business/abstracts/patient-related";
import { routeTo } from "../../main";
import { passThrough } from "../../utils/promises";
import ActionButton from "../../widget/action-button";
import ActionConfirm from "../../widget/action-confirm";
import notification from "../../widget/notification";
import {
  folderFileCreate,
  folderFileDelete,
  folderFileUpdate
} from "../loaders";
import {
  Modes,
  patientRouterToFile,
  patientRouterToPatient
} from "../patient-router";

import type { ButtonContext } from "./button-context";

export default function EditButtons({
  file,
  onDelete,
  onUpdate,
  context,
  formRef
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

  const doSave = () => {
    if (!formRef.current!.checkValidity()) {
      formRef.current!.requestSubmit();
      return;
    }

    const data = new FormData(formRef.current!);
    if (addMode) {
      return folderFileCreate(file, data)
        .then(notification("File created"))
        .then(
          passThrough((newFile) => {
            // Route to the newly created file
            location.hash = patientRouterToFile(
              context.folder.id ?? "",
              context.staticType,
              newFile.id!,
              Modes.output
            );
          })
        )
        .then(onUpdate);
    } else {
      return folderFileUpdate(file, data)
        .then(notification("File saved"))
        .then(
          passThrough(() =>
            routeTo(
              patientRouterToFile(
                context.folder.id!,
                context.staticType,
                file.id!,
                Modes.output
              )
            )
          )
        )
        .then(onUpdate);
    }
  };

  if (formRef.current) {
    formRef.current.onsubmit = (e) => {
      e.preventDefault();
      doSave();
    };
  }

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
      <ActionButton style="Confirm" action="Save" onOk={doSave} />
    </>
  );
}
