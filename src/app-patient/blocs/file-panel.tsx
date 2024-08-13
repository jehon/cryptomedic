import React, { useRef, useState } from "react";
import PatientRelated from "../../business/abstracts/patient-related";
import Pojo from "../../business/abstracts/pojo";
import Folder from "../../business/folder";
import Patient from "../../business/patient";
import { icons } from "../../config";
import { date2HumanString, normalizeDate } from "../../utils/date";
import ActionButton from "../../widget/action-button";
import ActionConfirm from "../../widget/action-confirm";
import { EditContext } from "../../widget/io-abstract";
import { notifySuccess } from "../../widget/notification";
import Panel from "../../widget/panel";
import { folderFileDelete, folderFileSave, folderFileUnlock } from "../loaders";
import { routeToFolderFile } from "../patient-router";

export type FolderUpdateCallback = (folder: Folder | undefined) => void;

// TODO: migrate all this progressively
export function isTodoMigration(type: typeof Pojo) {
  if (location.search == "?dev") {
    console.warn("In dev mode for", type.getTechnicalName());
    return false;
  }

  return [
    "Appointment",
    "Bill",
    "ClubFoot",
    "OtherConsult",
    "RicketConsult",
    "Patient",
    "Payment",
    "Picture",
    "Price",
    "Surgery"
  ].includes(type.getModel());
}

export default function FilePanel({
  file,
  folder,
  header,
  children,
  footer,
  closed,
  onUpdate
}: {
  file: Pojo;
  folder: Folder;
  header?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  closed?: boolean;
  onUpdate: FolderUpdateCallback;
}): React.ReactNode {
  const [editState, updateEditState] = useState(false);
  const formRef = useRef(null);

  const goToPatientFile = () => {
    document.location = routeToFolderFile(folder, file);
  };

  const goEdit = (file: Pojo) => {
    if (
      // TODO: migrate all this progressively
      isTodoMigration(file.getStatic())
    ) {
      location.hash = [
        "folder",
        "" + folder.getId(),
        "file",
        file.getStatic().getModel(),
        "" + file.getId(),
        "edit"
      ].join("/");
      return;
    }

    updateEditState(true);
  };

  const doUnlock = () => {
    folderFileUnlock(file)
      .then((file) => folder.withFile(file))
      .then(notifySuccess("File unlocked"))
      .then((newFolder) => onUpdate(newFolder))
      .then(() => goEdit(file));
  };

  const doSave = () => {
    const data = new FormData(formRef.current!);
    folderFileSave(file, data)
      .then(notifySuccess("File saved"))
      .then((f) => {
        onUpdate(f);
        updateEditState(false);
        return f;
      });
  };

  const doDelete = () => {
    folderFileDelete(file)
      .then(notifySuccess("File deleted"))
      .then((folder) => onUpdate(folder));
  };

  return (
    <Panel
      testid={file.uid()}
      closed={closed}
      onToggle={(_opened) => {
        // TODO: when angular router is out
        // if (opened) {
        //   location.hash = `/folder/${folder.getId()}/summary/${file.uid()}`;
        // }
      }}
      header={
        <>
          <span className="first">
            <img
              src={
                icons.models[
                  (file.getStatic().getModel() as keyof typeof icons.models) ??
                    ""
                ]
              }
              alt={file.getStatic().getTitle()}
              className="inline"
            />
            {
              // TODO: use interface?
              "date" in file ? (
                <span className="no-mobile">
                  {date2HumanString(normalizeDate(file["date"] as Date))}
                </span>
              ) : null
            }
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
          editState ? (
            <>
              <ActionButton
                style="Confirm"
                action="Save"
                onOk={() => doSave()}
              />
              <ActionButton
                style="Cancel"
                onOk={() => updateEditState(false)}
              />
              {file instanceof PatientRelated &&
                (!(file instanceof Patient) ||
                  folder.getFilesRelatedToPatient().length == 0) && (
                  <ActionConfirm
                    style="Delete"
                    discrete={true}
                    onOk={() => doDelete()}
                    requires="folder.delete"
                  >
                    <div>
                      Are you sure you want to DELETE the File{" "}
                      {file.getStatic().getTitle()}?
                    </div>
                  </ActionConfirm>
                )}
            </>
          ) : (
            <ActionButton
              style="Edit"
              onOk={() => goEdit(file)}
              requires="folder.edit"
            />
          )}
        </>
      }
    >
      <div className="technical" onClick={goToPatientFile}>
        <div>{file.uid()}</div>
        <div>created at {date2HumanString(normalizeDate(file.created_at))}</div>
        <div>updated at {date2HumanString(normalizeDate(file.updated_at))}</div>
        <div>by {file.last_user}</div>
      </div>
      <EditContext.Provider value={editState}>
        <form
          id="file"
          data-testid={"file-" + file.uid() + "-form"}
          ref={formRef}
        >
          {children}
        </form>
      </EditContext.Provider>
      {footer}
    </Panel>
  );
}

// TODO: use new Form "action"
