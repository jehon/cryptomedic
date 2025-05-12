import { useRef } from "react";
import { ButtonGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PatientRelated from "../../business/abstracts/patient-related";
import Pojo from "../../business/abstracts/pojo";
import Timed from "../../business/abstracts/timed";
import Appointment from "../../business/appointment";
import Folder from "../../business/folder";
import Patient from "../../business/patient";
import { icons, isFeatureSwitchEnabled, type2Title } from "../../config";
import { routeTo } from "../../main";
import { isLocked } from "../../utils/calculations";
import { date2HumanString, normalizeDate } from "../../utils/date";
import { EditContext } from "../../widget/io-abstract";
import Panel from "../../widget/panel";
import type { ButtonContext } from "./button-context";
import EditButtons from "./edit-buttons";
import ViewButtons from "./view-buttons";

export type FolderUpdateCallback = (folder: Folder | undefined) => void;

// TODO: migrate all this progressively
export function isTodoMigration(type: typeof Pojo) {
  if (isFeatureSwitchEnabled()) {
    return false;
  }
  return "bill" == type.getTechnicalName();
}

// TODO: make routing more abstract

export default function FilePanel(props: {
  folder: Folder;
  file: PatientRelated;
  header?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  closed?: boolean;
  onUpdate: FolderUpdateCallback;
  edit?: boolean;
}): React.ReactNode {
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();

  const addMode = !props.file.id;
  const editMode = addMode || (props.edit ?? false);

  const buttonContext: ButtonContext = {
    folder: props.folder,
    staticType: props.file.getStatic() as typeof PatientRelated,
    title: type2Title(props.file.getStatic().getTechnicalName()),
    editMode,
    isLocked:
      props.file instanceof PatientRelated &&
      !(props.file instanceof Patient) &&
      !(props.file instanceof Appointment) &&
      isLocked(props.file),
    canDelete:
      props.file instanceof PatientRelated &&
      !addMode &&
      (!(props.file instanceof Patient) ||
        props.folder.getChildren().length == 0)
  };

  const fileIsUpdated = (nFile: PatientRelated) =>
    props.onUpdate(props.folder.withFileOLD(nFile));

  const fileIsDeleted = () => {
    props.onUpdate(props.folder.withoutFileOLD(props.file));
    if (props.file instanceof Patient) {
      routeTo("/home");
    } else {
      navigate(`/patient/${props.folder.id}`);
    }
  };

  return (
    <Panel
      testid={`${props.file.getStatic().getTechnicalName()}.${props.file.id ?? "add"}`}
      closed={props.closed}
      fullscreen={editMode}
      onToggle={(_opened) => {
        // if (opened) {
        // TODO: when angular router is out (adapt e2e file panel goEdit too)
        // navigate(`/patient/${patientId}/${fileType.getTechnicalName()}.${fileId}${mode ? `/${mode}` : ""}`);
        //   location.hash = routeToFolderFile(folder, file);
        // }
      }}
      header={
        <>
          <span className="first">
            <img
              src={
                icons.models[
                  (props.file
                    .getStatic()
                    .getTechnicalName() as keyof typeof icons.models) ?? ""
                ]
              }
              alt={type2Title(props.file.getStatic().getTechnicalName())}
              className="inline"
            />
            {props.file instanceof Timed ? (
              <span className="no-mobile">
                {date2HumanString(normalizeDate(props.file["date"]))}
              </span>
            ) : null}
            <span data-role="type" className="no-mobile">
              {type2Title(props.file.getStatic().getTechnicalName())}
            </span>
          </span>
          {props.header}
        </>
      }
      actions={
        <>
          <ViewButtons
            file={props.file}
            onUpdate={fileIsUpdated}
            context={buttonContext}
          />
          <EditButtons
            file={props.file}
            onDelete={fileIsDeleted}
            onUpdate={fileIsUpdated}
            context={buttonContext}
            formRef={formRef}
          />
        </>
      }
    >
      <div
        className="technical"
        data-e2e="excluded"
        onClick={() =>
          navigate(
            `/patient/${props.folder.id}/${props.file.getStatic().getTechnicalName()}.${props.file.id!}`
          )
        }
      >
        <div>{`${props.file.getStatic().getTechnicalName()}.${props.file.id ?? "add"}`}</div>
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
          data-testid={`file-${props.file.getStatic().getTechnicalName()}.${props.file.id ?? "add"}-form`}
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
              <EditButtons
                file={props.file}
                onDelete={fileIsDeleted}
                onUpdate={fileIsUpdated}
                context={{ ...buttonContext, canDelete: false }}
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
