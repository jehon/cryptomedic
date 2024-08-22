import React, { useRef, useState } from "react";
import PatientRelated from "../../business/abstracts/patient-related";
import Pojo from "../../business/abstracts/pojo";
import Folder from "../../business/folder";
import Patient from "../../business/patient";
import { icons } from "../../config";
import { date2HumanString, normalizeDate } from "../../utils/date";
import { passThrough } from "../../utils/promises";
import ActionButton from "../../widget/action-button";
import ActionConfirm from "../../widget/action-confirm";
import { EditContext } from "../../widget/io-abstract";
import { notifySuccess } from "../../widget/notification";
import Panel from "../../widget/panel";
import {
  folderFileCreate,
  folderFileDelete,
  folderFileUnlock,
  folderFileUpdate
} from "../loaders";
import { patientRouterToFile } from "../patient-router";

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

  const addMode = !file.getId();

  const goToPatientFile = () => {
    document.location = patientRouterToFile(folder, file);
  };

  const goEdit = () => {
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

    if (editState == false) {
      updateEditState(true);
    }
  };

  const doUnlock = () => {
    folderFileUnlock(file)
      .then((file) => folder.withFile(file))
      .then(notifySuccess("File unlocked"))
      .then((newFolder) => onUpdate(newFolder))
      .then(() => goEdit());
  };

  const doSave = async () => {
    const data = new FormData(formRef.current!);
    let nFolder;
    if (addMode) {
      nFolder = await folderFileCreate(file, data)
        .then(notifySuccess("File created"))
        .then(
          passThrough((json) => {
            // Route to the newly created file
            location.hash = patientRouterToFile(
              json.folder,
              json.folder.getByTypeAndId(file.constructor, json.newKey)
            );
          })
        )
        .then((json) => json.folder);
    } else {
      nFolder = await folderFileUpdate(file, data).then(
        notifySuccess("File saved")
      );
    }
    onUpdate(nFolder);
    if (editState == true) {
      updateEditState(false);
    }
  };

  const doCancel = () => {
    if (addMode) {
      // Remove the newly added file, that we don't want to keep
      onUpdate(folder.withoutFile(file));
    }
    updateEditState(false);
  };

  const doDelete = () => {
    folderFileDelete(file)
      .then(notifySuccess("File deleted"))
      .then((folder) => onUpdate(folder));
  };

  if (addMode) {
    if (editState == false) {
      updateEditState(true);
    }
  }

  return (
    <Panel
      testid={file.uid()}
      closed={closed}
      fullscreen={editState}
      onToggle={(_opened) => {
        // TODO: when angular router is out
        // if (opened) {
        //   location.hash = routeToFolderFile(folder, file);
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
              <ActionButton style="Cancel" onOk={() => doCancel()} />
              {file instanceof PatientRelated &&
                !addMode &&
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
              onOk={() => goEdit()}
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
        </form>
      </EditContext.Provider>
      {footer}
    </Panel>
  );
}

// TODO: use new Form "action"
