import React from "react";

import Panel from "../../widget/panel";
import { Button } from "react-bootstrap";
import { icons } from "../../config";
import Pojo from "../../business/abstracts/pojo";
import Folder from "../../business/folder";

import { date2HumanString, normalizeDate } from "../../utils/date";
import ActionButton from "../../widget/action-button";

export default function FilePanel({
  file,
  folder,
  header,
  children,
  closed
}: {
  file: Pojo;
  folder: Folder;
  header?: React.ReactNode;
  children: React.ReactNode;
  closed?: boolean;
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
        <ActionButton
          style={ActionButton.ActionStyles.View}
          linkTo={[
            "folder",
            "" + folder.getId(),
            "file",
            file.getModel(),
            "" + file.getId()
          ]}
        />
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
      {children}
    </Panel>
  );
}
