import { useRef } from "react";
import { ButtonGroup } from "react-bootstrap";
import PatientRelated from "../../business/abstracts/patient-related";
import Timed from "../../business/abstracts/timed";
import Folder from "../../business/folder";
import Patient from "../../business/patient";
import { icons } from "../../config";
import { routeTo } from "../../main";
import { date2HumanString, normalizeDate } from "../../utils/date";
import { EditContext } from "../../widget/io-abstract";
import Panel from "../../widget/panel";
import {
  Modes,
  patientRouterToFile,
  patientRouterToPatient
} from "../patient-router";
import type { ButtonContext } from "./button-context";
import EditButtons from "./edit-buttons";
import ViewButtons from "./view-buttons";

export type FolderUpdateCallback = (folder: Folder | undefined) => void;

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
  // const navigate = useNavigate();

  const addMode = !file.getId();
  const editMode = addMode || (edit ?? false);

  console.log("FilePanel - Debug:", {
    fileUid: file.uid(),
    fileId: file.getId(),
    addMode,
    editMode,
    edit,
    isLocked: file instanceof PatientRelated && file.isLocked()
  });

  const buttonContext: ButtonContext = {
    folder,
    staticType: file.getStatic() as typeof PatientRelated,
    title: file.getStatic().getTitle(),
    migrationUrlHash: `folder/${file.getParentId()}/file/${file.getStatic().getModel()}`,
    editMode,
    isLocked: file instanceof PatientRelated && file.isLocked(),
    canDelete:
      file instanceof PatientRelated &&
      !addMode &&
      (!(file instanceof Patient) || folder.getChildren().length == 0)
  };

  console.log("FilePanel - ButtonContext:", buttonContext);

  const fileIsUpdated = (nFile: PatientRelated) =>
    onUpdate(folder.withFileOLD(nFile));

  const fileIsDeleted = () => {
    onUpdate(folder.withoutFileOLD(file));
    if (file instanceof Patient) {
      routeTo("/home");
    } else {
      routeTo(patientRouterToPatient(file.getParentId()!, Modes.output));
    }
  };

  return (
    <Panel
      testid={file.uid()}
      closed={closed}
      fullscreen={editMode}
      onToggle={(opened) => {
        // if (opened) {
        // TODO: when angular router is out (adapt e2e file panel goEdit too)
        // navigate(patientRouterToFile(folder, file));
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
              alt={file.getStatic().getTitle()}
              className="inline"
            />
            {file instanceof Timed ? (
              <span className="no-mobile">
                {date2HumanString(normalizeDate(file["date"]))}
              </span>
            ) : null}
            <span data-role="type" className="no-mobile">
              {file.getStatic().getTitle()}
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
          routeTo(
            patientRouterToFile(
              file.getParentId()!,
              file.getStatic(),
              file.getId()!,
              Modes.output
            )
          )
        }
      >
        <div>{file.uid()}</div>
        <div>created at {date2HumanString(normalizeDate(file.created_at))}</div>
        <div>updated at {date2HumanString(normalizeDate(file.updated_at))}</div>
        <div>by {file.last_user}</div>
      </div>
      <EditContext.Provider value={editMode}>
        <form
          id="file"
          data-testid={"file-" + file.uid() + "-form"}
          ref={formRef}
        >
          {file.getParentField() && (
            <input
              type="hidden"
              name={file.getParentField()}
              value={file.getParentId()}
            />
          )}
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
