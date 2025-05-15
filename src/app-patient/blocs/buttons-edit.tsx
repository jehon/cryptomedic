import { useNavigate } from "react-router-dom";
import { passThrough } from "../../utils/promises";
import { routeParent } from "../../utils/routing";
import ActionButton from "../../widget/action-button";
import ActionConfirm from "../../widget/action-confirm";
import notification from "../../widget/notification";
import { CrudLoader } from "../loaders";
import type { Pojo } from "../objects";
import type { ButtonContext } from "./buttons-view";

export default function ButtonsEdit<T extends Pojo>(
  props: ButtonContext & {
    file: Pojo;
    onDelete: () => void;
    onUpdate: (file: T) => void;
    // baseNavigate: string;
    formRef: React.RefObject<HTMLFormElement | null>;
  }
) {
  const navigate = useNavigate();
  const crudLoader = new CrudLoader<T>(props.apiRootUrl, props.type);

  if (!props.editMode) {
    return <></>;
  }

  const addMode = !props.file.id;

  const doDelete = () =>
    crudLoader
      .delete(props.file.id!)
      .then(notification("File deleted"))
      .then(props.onDelete);

  const doCancel = () => {
    if (addMode) {
      // // This is not necessary because the top folder will reload anyway
      // TODO: when migrated, remove added file
      // // Remove the newly added file, that we don't want to keep
      // onUpdate(folder.withoutFile(file));
      navigate(routeParent(props.selfUrl, 2));
    } else {
      navigate(props.selfUrl);
    }
  };

  const doSave = () => {
    if (!props.formRef.current!.checkValidity()) {
      props.formRef.current!.requestSubmit();
      return;
    }

    const data = new FormData(props.formRef.current!);
    if (addMode) {
      return crudLoader
        .create(data)
        .then(notification("File created"))
        .then(
          passThrough((newFile: T) => {
            // Route to the newly created file
            navigate(`${routeParent(props.selfUrl)}/${newFile.id}`);
          })
        )
        .then(props.onUpdate);
    } else {
      return crudLoader
        .update(props.file.id!, data)
        .then(notification("File saved"))
        .then(passThrough(() => navigate(props.selfUrl)))
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
