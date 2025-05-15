import { useRef } from "react";
import { ButtonGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Folder from "../../business/folder";
import { icons, type2Title, type BusinessType } from "../../config";
import { date2HumanString, normalizeDate } from "../../utils/date";
import { routeParent } from "../../utils/routing";
import { EditContext } from "../../widget/io-abstract";
import Panel from "../../widget/panel";
import type { PatientRelated, Pojo } from "../objects";
import ButtonsEdit from "./buttons-edit";
import ButtonsView, { type ButtonContext } from "./buttons-view";

export type FolderUpdateCallback = (folder: Folder | undefined) => void;

export default function FilePanel<T extends Pojo>(props: {
  selfUrl: string;
  apiRootUrl: string;
  type: BusinessType;
  folder: Folder;
  file: T;
  header?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  closed?: boolean;
  edit?: boolean;
  canBeLocked: boolean;
  canBeDeleted: boolean;
  onUpdate: FolderUpdateCallback;
}): React.ReactNode {
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();

  const addMode = !props.file.id;
  const editMode = addMode || (props.edit ?? false);

  const buttonContext: ButtonContext = {
    selfUrl: props.selfUrl,
    apiRootUrl: props.apiRootUrl,
    type: props.type,
    title: type2Title(props.type),
    editMode
  };

  const fileIsUpdated = (nFile: T) =>
    props.onUpdate(
      props.folder.withFileOLD(nFile as unknown as PatientRelated)
    );

  const fileIsDeleted = () => {
    props.onUpdate(
      props.folder.withoutFileOLD(props.file as unknown as PatientRelated)
    );
    if (props.file._type == "patient") {
      // TODO: handle this
      navigate("/");
    } else {
      navigate(routeParent(props.selfUrl, 2));
    }
  };

  return (
    <Panel
      testid={`${props.type}.${props.file.id ?? "add"}`}
      closed={props.closed}
      fullscreen={editMode}
      onToggle={(_opened) => {
        // if (opened) {
        // TODO: when angular router is out (adapt e2e file panel goEdit too)
        // navigate(`/patient/${patientId}/${props.type}/${fileId}${mode ? `/${mode}` : ""}`);
        //   location.hash = routeToFolderFile(folder, file);
        // }
      }}
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
          <ButtonsView<T>
            {...buttonContext}
            file={props.file}
            canBeLocked={props.canBeLocked}
            onUpdate={fileIsUpdated}
          />
          <ButtonsEdit<T>
            {...buttonContext}
            file={props.file}
            canDelete={!addMode && props.canBeDeleted}
            onDelete={fileIsDeleted}
            onUpdate={fileIsUpdated}
            formRef={formRef}
          />
        </>
      }
    >
      <div
        className="technical"
        data-e2e="excluded"
        onClick={() => navigate(props.selfUrl)}
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
              <ButtonsEdit
                {...buttonContext}
                file={props.file}
                onDelete={fileIsDeleted}
                onUpdate={fileIsUpdated}
                canDelete={false}
                formRef={formRef}
              />
            </ButtonGroup>
          )}
        </form>
      </EditContext.Provider>
      {props.footer}
    </Panel>
  );
}

// TODO: use new Form "action"
