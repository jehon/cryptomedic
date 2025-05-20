import { CrudLoader } from "../app-patient/loaders-patient";
import type { Pojo } from "../app-patient/objects-patient";
import { passThrough } from "../utils/promises";
import ActionButton from "./action-button";
import ActionConfirm from "./action-confirm";
import type { ButtonContext } from "./buttons-view";
import notification from "./notification";

export default function ButtonsEdit<T extends Pojo>(
  props: ButtonContext<T> & {
    file: T;
    canDelete: boolean;
    onDeleted: (file: T) => void;
    onUpdated: (file: T) => void;
    onCreated: (file: T) => void;
    formRef: React.RefObject<HTMLFormElement | null>;
  }
) {
  const crudLoader = new CrudLoader<T>(props.apiRootUrl, props.type);
  if (!props.edit) {
    return <></>;
  }

  const addMode = !props.file.id;

  const doDelete = () => {
    crudLoader
      .delete(props.file.id!)
      .then(notification("File deleted"))
      .then(passThrough(() => props.setEdit(false)))
      .then(passThrough(() => props.onDeleted(props.file)));
  };

  const doCancel = () => {
    props.setEdit(false);
  };

  const doSave = () => {
    if (!props.formRef.current!.checkValidity()) {
      props.formRef.current!.requestSubmit();
      return;
    }

    const data = new FormData(props.formRef.current!);
    if (addMode) {
      return (
        crudLoader
          .create(data)
          .then(notification("File created"))
          // Route to the newly created file
          .then(passThrough(() => props.setEdit(false)))
          .then(passThrough(props.onCreated))
      );
    } else {
      return crudLoader
        .update(props.file.id!, data)
        .then(notification("File saved"))
        .then(passThrough(() => props.setEdit(false)))
        .then(passThrough(props.onUpdated));
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
