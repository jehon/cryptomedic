import { useRef } from "react";
import { ButtonGroup } from "react-bootstrap";
import PatientRelated from "../../business/abstracts/patient-related";
import Pojo from "../../business/abstracts/pojo";
import Timed from "../../business/abstracts/timed";
import Folder from "../../business/folder";
import Patient from "../../business/patient";
import { icons, isFeatureSwitchEnabled } from "../../config";
import { routeTo } from "../../main";
import { date2HumanString, normalizeDate } from "../../utils/date";
import { passThrough } from "../../utils/promises";
import ActionButton from "../../widget/action-button";
import ActionConfirm from "../../widget/action-confirm";
import { EditContext } from "../../widget/io-abstract";
import notification from "../../widget/notification";
import Panel from "../../widget/panel";
import {
  folderFileCreate,
  folderFileDelete,
  folderFileUnlock,
  folderFileUpdate
} from "../loaders";
import {
  Modes,
  patientRouterToFile,
  patientRouterToPatient
} from "../patient-router";

export type FolderUpdateCallback = (folder: Folder | undefined) => void;

// TODO: migrate all this progressively
export function isTodoMigration(type: typeof Pojo) {
  return [...(isFeatureSwitchEnabled() ? [] : ["bill"])].includes(
    type.getTechnicalName()
  );
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
  // const navigate = useNavigate();

  const addMode = !file.getId();
  const editMode = addMode || (edit ?? false);

  const goToPatientFile = () =>
    routeTo(
      patientRouterToFile(
        file.getParentId()!,
        file.getStatic(),
        file.getId()!,
        Modes.output
      )
    );
  const goEdit = () => {
    if (
      // TODO: migrate all this progressively
      isTodoMigration(file.getStatic())
    ) {
      location.hash = [
        "folder",
        "" + file.getParentId(),
        "file",
        file.getStatic().getModel(),
        "" + file.getId(),
        "edit"
      ].join("/");
      return;
    }

    routeTo(
      patientRouterToFile(
        file.getParentId() ?? "",
        file.getStatic(),
        file.getId()!,
        "edit"
      )
    );
  };

  const doUnlock = () => {
    folderFileUnlock(file)
      .then((file) => folder.withFileOLD(file))
      .then(notification("File unlocked"))
      .then(onUpdate)
      .then(() => goEdit());
  };

  const doSave = (e?: React.SyntheticEvent) => {
    if (e) {
      // If we are call as form submit
      e.preventDefault();
    }
    if (!formRef.current!.checkValidity()) {
      formRef.current!.requestSubmit();
      return;
    }

    const data = new FormData(formRef.current!);
    let nFolder;
    if (addMode) {
      return folderFileCreate(file, data)
        .then(notification("File created"))
        .then(
          passThrough((json) => {
            // Route to the newly created file
            location.hash = patientRouterToFile(
              file.getParentId() ?? "",
              file.constructor,
              json.newKey,
              Modes.output
            );
          })
        )
        .then((json) => json.folder)
        .then(onUpdate);
    } else {
      return folderFileUpdate(file, data)
        .then(notification("File saved"))
        .then(
          passThrough(() =>
            routeTo(
              patientRouterToFile(
                file.getParentId()!,
                file.getStatic(),
                file.getId()!,
                Modes.output
              )
            )
          )
        )
        .then(onUpdate);
    }
  };

  const doCancel = () => {
    if (addMode) {
      // // This is not necessary because the top folder will reload anyway
      // // Remove the newly added file, that we don't want to keep
      // onUpdate(folder.withoutFile(file));
      routeTo(patientRouterToPatient(folder.getId()!, Modes.output));
    } else {
      routeTo(
        patientRouterToFile(
          folder.getId()!,
          file.getStatic(),
          file.getId()!,
          Modes.output
        )
      );
    }
  };

  const doDelete = () =>
    folderFileDelete(file)
      .then(notification("File deleted"))
      .then(
        passThrough(() =>
          routeTo(patientRouterToPatient(file.getParentId()!, Modes.output))
        )
      )
      .then(onUpdate);

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
          {file.isLocked() ? (
            // File is locked
            file instanceof PatientRelated && (
              <ActionConfirm
                style="Alternate"
                action="Unlock"
                discrete={true}
                onOk={() => doUnlock()}
                requires="folder.unlock"
              >
                <div>
                  Are you sure you want to unlock the File{" "}
                  {file.getStatic().getTitle()}?
                  <br />
                  Anybody will then be able to edit it.
                </div>
              </ActionConfirm>
            )
          ) : // File is not locked
          editMode ? (
            <>
              {file instanceof PatientRelated &&
                !addMode &&
                (!(file instanceof Patient) ||
                  folder.getChildren().length == 0) && (
                  <ActionConfirm
                    style="Delete"
                    discrete={true}
                    onOk={() => doDelete()}
                    requires="folder.delete"
                  >
                    <div>
                      Are you sure you want to DELETE the File
                      {file.getStatic().getTitle()}?
                    </div>
                  </ActionConfirm>
                )}
            </>
          ) : (
            <ActionButton
              style="Edit"
              onOk={() => goEdit()}
              requires="folder.edit"
            />
          )}
        </>
      }
    >
      <div className="technical" data-e2e="excluded" onClick={goToPatientFile}>
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
          onSubmit={doSave}
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
              <ActionButton style="Confirm" action="Save" onOk={doSave} />
              <ActionButton style="Cancel" onOk={() => doCancel()} />
            </ButtonGroup>
          )}
        </form>
      </EditContext.Provider>
      {footer}
    </Panel>
  );
}

// TODO: use new Form "action"
