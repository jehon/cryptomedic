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
import type { ButtonContext } from "./buttons-view";

export default function ButtonsEdit(
  props: ButtonContext & {
    file: PatientRelated;
    onDelete: () => void;
    onUpdate: (file: PatientRelated) => void;
    // baseNavigate: string;
    formRef: React.RefObject<HTMLFormElement | null>;
  }
) {
  const navigate = useNavigate();
  if (!props.editMode) {
    return <></>;
  }

  const addMode = !props.file.id;

  const doDelete = () =>
    folderFileDelete(props.file)
      .then(notification("File deleted"))
      .then(props.onDelete);

  const doCancel = () => {
    if (addMode) {
      // // This is not necessary because the top folder will reload anyway
      // TODO: when migrated, remove added file
      // // Remove the newly added file, that we don't want to keep
      // onUpdate(folder.withoutFile(file));
      navigate(props.parentUrl);
    } else {
      navigate(`${props.parentUrl}/${props.type}/${props.file.id!}`);
    }
  };

  const doSave = () => {
    if (!props.formRef.current!.checkValidity()) {
      props.formRef.current!.requestSubmit();
      return;
    }

    const data = new FormData(props.formRef.current!);
    if (addMode) {
      return folderFileCreate(props.file, data)
        .then(notification("File created"))
        .then(
          passThrough((newFile) => {
            // Route to the newly created file
            navigate(`${props.parentUrl}/${props.type}/${newFile.id!}`);
          })
        )
        .then(props.onUpdate);
    } else {
      return folderFileUpdate(props.file, data)
        .then(notification("File saved"))
        .then(
          passThrough(() =>
            navigate(`${props.parentUrl}/${props.type}/${props.file.id!}`)
          )
        )
        .then(props.onUpdate);
    }
  };

  return (
    <>
      {props.canDelete && (
        <ActionConfirm
          style="Delete"
          discrete={true}
          onOk={doDelete}
          requires="folder.delete"
        >
          <div>Are you sure you want to DELETE the File {props.title}?</div>
        </ActionConfirm>
      )}
      <ActionButton style="Cancel" onOk={() => doCancel()} />
      <ActionButton style="Confirm" action="Save" onOk={doSave} />
    </>
  );
}
