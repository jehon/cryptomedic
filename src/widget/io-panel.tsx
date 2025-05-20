import { useEffect, useRef, useState } from "react";
import { ButtonGroup } from "react-bootstrap";
import { CrudLoader } from "../app-patient/loaders-patient";
import type { Pojo } from "../app-patient/objects-patient";
import { icons, type2Title, type BusinessType } from "../config";
import { date2HumanString, normalizeDate } from "../utils/date";
import { passThrough } from "../utils/promises";
import ActionButton from "./action-button";
import ActionConfirm from "./action-confirm";
import { EditContext } from "./io-abstract";
import notification from "./notification";
import Panel from "./panel";

type ButtonContext<T> = {
  apiRootUrl: string;
  type: BusinessType;
  file: T;
  title: string;
  edit: boolean;
  onCreated: (file: T) => void;
  onDeleted: (file: T) => void;
  onUpdated: (file: T) => void;
  setEdit: (edit: boolean) => void;
};

function ButtonsView<T extends Pojo>(
  props: ButtonContext<T> & {
    file: T;
    onUpdated: (file: T) => void;
    canBeLocked: boolean;
  }
) {
  const crudLoader = new CrudLoader<T>(props.apiRootUrl, props.type);
  let isLocked = false;
  if (props.canBeLocked) {
    if (props.file.updated_at) {
      const dlock = new Date(props.file.updated_at);
      dlock.setDate(dlock.getDate() + 35);
      isLocked = dlock < new Date();
    }
  }

  const doUnlock = () => {
    crudLoader
      .unlock(props.file.id!)
      .then(notification("File unlocked"))
      .then(passThrough(() => props.setEdit(true)))
      .then(passThrough(props.onUpdated));
  };

  if (isLocked) {
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

  if (props.edit) {
    return <></>;
  }

  return (
    <ActionButton
      style="Edit"
      onOk={() => props.setEdit(true)}
      requires="folder.edit"
    />
  );
}

function ButtonsEdit<T extends Pojo>(
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

export default function IOPanel<T extends Pojo>(props: {
  apiRootUrl: string;
  type: BusinessType;
  file: T;
  header?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  closed?: boolean;
  edit?: boolean;
  canBeLocked: boolean;
  canBeDeleted: boolean;
  onCreated: (file: T) => void;
  onDeleted: (file: T) => void;
  onUpdated: (file: T) => void;
  onEdit?: (edit: boolean) => void;
}): React.ReactNode {
  const formRef = useRef<HTMLFormElement>(null);
  const [edit, setEditState] = useState<boolean>(
    !props.file.id || (props.edit ?? false)
  );
  const setEdit = (newEdit: boolean) => {
    if (newEdit != edit) {
      if (props.onEdit) props.onEdit(newEdit);
      setEditState(newEdit);
    }
  };
  useEffect(
    () => setEdit(!props.file.id || (props.edit ?? false)),
    [props.edit, props.file.id]
  );

  const [file, setFile] = useState<T>(props.file);
  useEffect(() => setFile(props.file), [props.file]);

  const buttonContext: ButtonContext<T> = {
    apiRootUrl: props.apiRootUrl,
    type: props.type,
    title: type2Title(props.type),
    file: props.file,
    edit,
    onCreated: props.onCreated,
    onDeleted: props.onDeleted,
    onUpdated: (file: T) => {
      setFile(file);
      props.onUpdated(file);
    },
    setEdit: setEdit
  };

  return (
    <Panel
      testid={`${props.type}.${props.file.id ?? "add"}`}
      closed={props.closed}
      fullscreen={edit}
      header={
        <>
          <span className="first">
            <img
              src={
                icons.models[(props.type as keyof typeof icons.models) ?? ""]
              }
              alt={type2Title(props.type)}
              className="inline"
            />
            {"date" in props.file ? (
              <span className="no-mobile">
                {date2HumanString(normalizeDate(props.file["date"] as string))}
              </span>
            ) : null}
            <span data-role="type" className="no-mobile">
              {type2Title(props.type)}
            </span>
          </span>
          {props.header}
        </>
      }
      actions={
        <>
          <ButtonsView<T> {...buttonContext} canBeLocked={props.canBeLocked} />
          <ButtonsEdit<T>
            {...buttonContext}
            formRef={formRef}
            canDelete={props.canBeDeleted && !!props.file.id}
          />
        </>
      }
    >
      <div
        className="technical"
        data-e2e="excluded"
        onClick={() => props.onEdit && props.onEdit(false)}
      >
        <div>{`${props.type}.${props.file.id ?? "add"}`}</div>
        <div>
          created at {date2HumanString(normalizeDate(props.file.created_at))}
        </div>
        <div>
          updated at {date2HumanString(normalizeDate(props.file.updated_at))}
        </div>
        <div>by {props.file.last_user}</div>
      </div>
      <EditContext.Provider value={edit}>
        <form
          id="file"
          data-testid={`file-${props.type}.${props.file.id ?? "add"}-form`}
          ref={formRef}
        >
          {props.file.updated_at && (
            <input
              type="hidden"
              name="updated_at"
              value={props.file.updated_at}
            />
          )}
          {props.children}
          {edit && (
            <ButtonGroup>
              <ButtonsEdit<T>
                {...buttonContext}
                formRef={formRef}
                canDelete={false}
              />
            </ButtonGroup>
          )}
        </form>
      </EditContext.Provider>
      {props.footer}
    </Panel>
  );
}
