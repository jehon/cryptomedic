import { useEffect, useRef, useState } from "react";
import { ButtonGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import type { Pojo } from "../app-patient/objects-patient";
import { icons, type2Title, type BusinessType } from "../config";
import { date2HumanString, normalizeDate } from "../utils/date";
import ButtonsEdit from "./buttons-edit";
import ButtonsView, { type ButtonContext } from "./buttons-view";
import { EditContext } from "./io-abstract";
import Panel from "./panel";

export default function IOPanel<T extends Pojo>(props: {
  selfPath?: string; // Optional: for Payments, we don't want to update the URL
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
  const navigate = useNavigate();
  const navigateIfRouting = (route?: string) =>
    props.selfPath ? navigate(route!) : () => {};

  // Mainly used when no url is updated to handle the edit mode
  const [edit, setEditState] = useState<boolean>(props.edit ?? false);
  const setEdit = (newEdit: boolean) => {
    if (newEdit != edit) {
      if (props.onEdit) props.onEdit(newEdit);
      setEditState(newEdit);
    }
  };
  useEffect(() => setEdit(props.edit ?? false), [props.edit]);

  const [file, setFile] = useState<T>(props.file);
  useEffect(() => setFile(props.file), [props.file]);

  const addMode = !props.file.id;
  const editMode = addMode || (edit ?? false);

  const buttonContext: ButtonContext<T> = {
    selfPath: props.selfPath,
    apiRootUrl: props.apiRootUrl,
    type: props.type,
    title: type2Title(props.type),
    file: props.file,
    editMode,
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
      fullscreen={editMode}
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
            canDelete={!addMode && props.canBeDeleted}
          />
        </>
      }
    >
      <div
        className="technical"
        data-e2e="excluded"
        onClick={() => navigateIfRouting(props.selfPath)}
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
      <EditContext.Provider value={editMode}>
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
          {editMode && (
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
