import React from "react";
import PatientRelated from "../../business/abstracts/patient-related";
import Pojo from "../../business/abstracts/pojo";
import Folder from "../../business/folder";
import { icons } from "../../config";
import { date2HumanString, normalizeDate } from "../../utils/date";
import ActionButton, { ActionStyles } from "../../widget/action-button";
import ActionConfirm from "../../widget/action-confirm";
import Panel from "../../widget/panel";
import Restricted from "../../widget/restricted";
import { folderFileUnlock } from "../loaders";

export type FolderUpdateCallback = (folder: Folder) => void;

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
                  onOk={() =>
                    folderFileUnlock<typeof file>(file)
                      .then((file) => folder.withFile(file))
                      .then((newFolder) => onUpdate(newFolder))
                  }
                >
                  <div>
                    Are you sure you want to unlock the File {file.getModel()}?
                    <br />
                    Anybody will then be able to edit it.
                  </div>
                </ActionConfirm>
              </Restricted>
            )
          ) : (
            // File is not locked
            <></>
          )}
          <ActionButton
            style={ActionStyles.Edit}
            linkTo={[
              "folder",
              "" + folder.getId(),
              "file",
              file.getModel(),
              "" + file.getId(),
              "edit"
            ]}
          />
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
