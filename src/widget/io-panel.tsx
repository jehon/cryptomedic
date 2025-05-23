import { produce } from "immer";
import { useEffect, useRef, useState } from "react";
import { ButtonGroup } from "react-bootstrap";
import { CrudLoader } from "../app-patient/loaders-patient";
import type { Pojo } from "../app-patient/objects-patient";
import { icons, type2Title, type BusinessType } from "../config";
import { sortList } from "../utils/calculations";
import { date2HumanString, normalizeDate } from "../utils/date";
import { passThrough } from "../utils/promises";
import ActionButton from "./action-button";
import ActionConfirm from "./action-confirm";
import { EditContext } from "./io-abstract";
import notification from "./notification";
import Panel from "./panel";

export function propagateToList<S extends Pojo, T extends Pojo>(
  file: S,
  listname: keyof S,
  updatedCallback: (file: S) => void
) {
  const withoutAdded = (list: T[]) => list.filter((v) => v.id);
  const list = file[listname] as T[];

  return {
    onCreated: (subFile: T) =>
      updatedCallback(
        produce<S>(file, (draft) => {
          // Hack for typescript
          (draft as any)[listname] = sortList(
            withoutAdded(list).concat([subFile])
          );
        })
      ),
    onUpdated: (subFile: T) =>
      updatedCallback(
        produce<S>(file, (draft) => {
          // Hack for typescript
          (draft as any)[listname] = sortList(withoutAdded(list))
            .filter((v) => v.id != subFile.id)
            .concat([subFile]);
        })
      ),
    onDeleted: (subFile: T) =>
      updatedCallback(
        produce<S>(file, (draft) => {
          // Hack for typescript
          (draft as any)[listname] = sortList(
            withoutAdded(list).filter((v) => v.id != subFile.id)
          );
        })
      )
  };
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
  restrictedTo: string;
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

  const title = type2Title(props.type);

  const crudLoader = new CrudLoader<T>(props.apiRootUrl, props.type);
  let isLocked = false;
  if (props.canBeLocked) {
    if (props.file.updated_at) {
      const deadline = new Date(props.file.updated_at);
      deadline.setDate(deadline.getDate() + 35);
      isLocked = deadline < new Date();
    }
  }

  const canDelete = props.canBeDeleted && !!props.file.id;

  const doCancel = () => setEdit(false);

  const doSave = () => {
    if (!formRef.current!.checkValidity()) {
      formRef.current!.requestSubmit();
      return;
    }

    const data = new FormData(formRef.current!);
    if (!props.file.id) {
      return (
        crudLoader
          .create(data)
          .then(notification("File created"))
          // Route to the newly created file
          .then(passThrough(() => setEdit(false)))
          .then(passThrough(props.onCreated))
      );
    } else {
      return crudLoader
        .update(props.file.id!, data)
        .then(notification("File saved"))
        .then(passThrough(() => setEdit(false)))
        .then(passThrough(props.onUpdated));
    }
  };
  const doUnlock = () => {
    crudLoader
      .unlock(props.file.id!)
      .then(notification("File unlocked"))
      .then(passThrough(() => setEdit(true)))
      .then(passThrough(props.onUpdated));
  };

  const doDelete = () => {
    crudLoader
      .delete(props.file.id!)
      .then(notification("File deleted"))
      .then(passThrough(() => setEdit(false)))
      .then(passThrough(() => props.onDeleted(props.file)));
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
          {edit ? (
            canDelete && (
              <>
                <ActionConfirm
                  style="Delete"
                  discrete={true}
                  onOk={doDelete}
                  restrictedTo={`${props.restrictedTo}.delete`}
                >
                  <div>Are you sure you want to DELETE the File {title}?</div>
                </ActionConfirm>
                <ActionButton style="Cancel" onOk={() => doCancel()} />
                <ActionButton
                  style="Confirm"
                  restrictedTo={`${props.restrictedTo}.edit`}
                  action="Save"
                  onOk={doSave}
                />
              </>
            )
          ) : isLocked ? (
            <ActionConfirm
              style="Alternate"
              action="Unlock"
              discrete={true}
              onOk={() => doUnlock()}
              restrictedTo={`${props.restrictedTo}.unlock`}
            >
              <div>
                Are you sure you want to unlock the File {title}?
                <br />
                Anybody will then be able to edit it.
              </div>
            </ActionConfirm>
          ) : (
            <ActionButton
              style="Edit"
              onOk={() => setEdit(true)}
              restrictedTo={`${props.restrictedTo}.edit`}
            />
          )}
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
          data-testid={`io-panel-form`}
          data-mode={edit ? "input" : "output"}
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
              <ActionButton style="Cancel" onOk={() => doCancel()} />
              <ActionButton
                style="Confirm"
                restrictedTo={`${props.restrictedTo}.edit`}
                action="Save"
                onOk={doSave}
              />
            </ButtonGroup>
          )}
        </form>
      </EditContext.Provider>
      {props.footer}
    </Panel>
  );
}
