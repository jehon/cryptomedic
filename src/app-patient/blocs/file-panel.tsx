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

export default function FilePanel({
  folder,
  file,
  header,
  children,
  footer,
  closed,
  onUpdate,
  edit
}: {
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

  const addMode = !file.id;
  const editMode = addMode || (edit ?? false);

  const buttonContext: ButtonContext = {
    folder,
    staticType: file.getStatic() as typeof PatientRelated,
    title: type2Title(file.getStatic().getTechnicalName()),
    editMode,
    isLocked:
      file instanceof PatientRelated &&
      !(file instanceof Patient) &&
      !(file instanceof Appointment) &&
      isLocked(file),
    canDelete:
      file instanceof PatientRelated &&
      !addMode &&
      (!(file instanceof Patient) || folder.getChildren().length == 0)
  };

  const fileIsUpdated = (nFile: PatientRelated) =>
    onUpdate(folder.withFileOLD(nFile));

  const fileIsDeleted = () => {
    onUpdate(folder.withoutFileOLD(file));
    if (file instanceof Patient) {
      routeTo("/home");
    } else {
      navigate(`/patient/${folder.id}`);
    }
  };

  return (
    <Panel
      testid={`${file.getStatic().getTechnicalName()}.${file.id ?? "add"}`}
      closed={closed}
      fullscreen={editMode}
      onToggle={(opened) => {
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
                  (file
                    .getStatic()
                    .getTechnicalName() as keyof typeof icons.models) ?? ""
                ]
              }
              alt={type2Title(file.getStatic().getTechnicalName())}
              className="inline"
            />
            {file instanceof Timed ? (
              <span className="no-mobile">
                {date2HumanString(normalizeDate(file["date"]))}
              </span>
            ) : null}
            <span data-role="type" className="no-mobile">
              {type2Title(file.getStatic().getTechnicalName())}
            </span>
          </span>
          {header}
        </>
      }
      actions={
        <>
          <ViewButtons
            file={file}
            onUpdate={fileIsUpdated}
            context={buttonContext}
          />
          <EditButtons
            file={file}
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
            `/patient/${folder.id}/${file.getStatic().getTechnicalName()}.${file.id!}`
          )
        }
      >
        <div>{`${file.getStatic().getTechnicalName()}.${file.id ?? "add"}`}</div>
        <div>created at {date2HumanString(normalizeDate(file.created_at))}</div>
        <div>updated at {date2HumanString(normalizeDate(file.updated_at))}</div>
        <div>by {file.last_user}</div>
      </div>
      <EditContext.Provider value={editMode}>
        <form
          id="file"
          data-testid={`file-${file.getStatic().getTechnicalName()}.${file.id ?? "add"}-form`}
          ref={formRef}
        >
          {file.updated_at && (
            <input type="hidden" name="updated_at" value={file.updated_at} />
          )}
          {children}
          {editMode && (
            <ButtonGroup>
              <EditButtons
                file={file}
                onDelete={fileIsDeleted}
                onUpdate={fileIsUpdated}
                context={{ ...buttonContext, canDelete: false }}
                formRef={formRef}
              />
            </ButtonGroup>
          )}
        </form>
      </EditContext.Provider>
      {footer}
    </Panel>
  );
}

// TODO: use new Form "action"
