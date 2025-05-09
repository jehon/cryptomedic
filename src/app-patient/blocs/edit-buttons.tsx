import { useNavigate } from "react-router-dom";
import PatientRelated from "../../business/abstracts/patient-related";
import { passThrough } from "../../utils/promises";
import ActionButton from "../../widget/action-button";
import ActionConfirm from "../../widget/action-confirm";
import notification from "../../widget/notification";
import {
  folderFileCreate,
  folderFileDelete,
  folderFileUpdate
} from "../loaders";

import type { ButtonContext } from "./button-context";

export default function EditButtons({
  file,
  onDelete,
  onUpdate,
  // baseNavigate,
  context,
  formRef
}: {
  file: PatientRelated;
  onDelete: () => void;
  onUpdate: (file: PatientRelated) => void;
  // baseNavigate: string;
  context: ButtonContext;
  formRef: React.RefObject<HTMLFormElement | null>;
}) {
  const navigate = useNavigate();
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
      navigate(`/patient/${context.folder.id!}`);
    } else {
      navigate(
        `/patient/${context.folder.id!}/${context.staticType.getTechnicalName()}.${file.id!}`
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
            navigate(
              `/patient/${context.folder.id!}/${context.staticType.getTechnicalName()}.${newFile.id!}`
            );
          })
        )
        .then(onUpdate);
    } else {
      return folderFileUpdate(file, data)
        .then(notification("File saved"))
        .then(
          passThrough(() =>
            navigate(
              `/patient/${context.folder.id!}/${context.staticType.getTechnicalName()}.${file.id!}`
            )
          )
        )
        .then(onUpdate);
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
      <ActionButton style="Confirm" action="Save" onOk={doSave} />
    </>
  );
}
