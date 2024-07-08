import React, { useState } from "react";
import PatientRelated from "../../business/abstracts/patient-related";
import Pojo from "../../business/abstracts/pojo";
import Folder from "../../business/folder";
import Patient from "../../business/patient";
import { icons } from "../../config";
import { date2HumanString, normalizeDate } from "../../utils/date";
import ActionButton, { ActionStyles } from "../../widget/action-button";
import ActionConfirm from "../../widget/action-confirm";
import { notifySuccess } from "../../widget/notification";
import Panel from "../../widget/panel";
import Restricted from "../../widget/restricted";
import { folderFileDelete, folderFileUnlock } from "../loaders";

export type FolderUpdateCallback = (folder: Folder | undefined) => void;

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

  const goEdit = (file: Pojo) => {
    if (location.search == "?dev") {
      updateEditState(true);
      return;
    }
    location.hash = [
      "folder",
      "" + folder.getId(),
      "file",
      file.getModel(),
      "" + file.getId(),
      "edit"
    ].join("/");
  };

  const doUnlock = () => {
    folderFileUnlock(file)
      .then((file) => folder.withFile(file))
      .then(notifySuccess("File unlocked"))
      .then((newFolder) => onUpdate(newFolder))
      .then(() => goEdit(file));
  };

  const doSave = () => {
    Promise.resolve()
      .then(notifySuccess("File saved"))
      .then((f) => {
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
      dataRole={file.uid()}
      closed={closed}
      header={
        <>
          <span className="first">
            <img
              src={
                icons.models[
                  (file.getModel() as keyof typeof icons.models) ?? ""
                ]
              }
              alt={file.getTitle()}
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
              {file.getTitle()}
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
              <Restricted requiresTransaction="folder.unlock">
                <ActionConfirm
                  style={ActionStyles.Alternate}
                  buttonText="Unlock"
                  discrete={true}
                  onOk={() => doUnlock()}
                >
                  <div>
                    Are you sure you want to unlock the File {file.getModel()}?
                    <br />
                    Anybody will then be able to edit it.
                  </div>
                </ActionConfirm>
              </Restricted>
            )
          ) : // File is not locked
          editState ? (
            <>
              <ActionButton
                style={ActionStyles.Confirm}
                text="Save"
                onClick={() => doSave()}
              />
              <ActionButton
                style={ActionStyles.Cancel}
                onClick={() => updateEditState(false)}
              />
              {file instanceof PatientRelated &&
                (!(file instanceof Patient) ||
                  folder.getFilesRelatedToPatient().length == 0) && (
                  <ActionConfirm
                    style={ActionStyles.Delete}
                    buttonText="Delete"
                    discrete={true}
                    onOk={() => doDelete()}
                  >
                    <div>
                      Are you sure you want to DELETE the File {file.getModel()}
                      ?
                    </div>
                  </ActionConfirm>
                )}
            </>
          ) : (
            <ActionButton
              style={ActionStyles.Edit}
              text="Edit"
              onClick={() => goEdit(file)}
            />
          )}
        </>
      }
    >
      <div className="technical">
        <div>
          {file.getModel()}#{file.id}
        </div>
        <div>created at {date2HumanString(normalizeDate(file.created_at))}</div>
        <div>updated at {date2HumanString(normalizeDate(file.updated_at))}</div>
        <div>by {file.last_user}</div>
      </div>
      <form id="file">{children}</form>
      {footer}
    </Panel>
  );
}
