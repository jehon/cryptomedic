import React from "react";

import Panel from "../../widget/panel";
import { Button } from "react-bootstrap";
import { icons } from "../../config";
import Pojo from "../../business/abstracts/pojo";
import Folder from "../../business/folder";

import { date2HumanString, normalizeDate } from "../../utils/date";

export default function FilePanel({
  file,
  folder,
  headers,
  children,
  closed
}: {
  file: Pojo;
  folder: Folder;
  headers: React.ReactNode;
  children: React.ReactNode;
  closed?: boolean;
}): React.ReactNode {
  if (!folder) {
    return <div>No folder selected</div>;
  }
  if (!file) {
    return <div>No file selected</div>;
  }
  return (
    <Panel
      closed={closed}
      headers={[
        <span className="first">
          <img
            src={
              icons.models[(file.getModel() as keyof typeof icons.models) ?? ""]
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
          <span className="no-mobile">{file.getTitle()}</span>
        </span>,
        headers
      ]}
    >
      <Button
        href={"#/folder/" + folder.getId() + "/"}
        variant="outline-info"
        style={{ width: "100%" }}
      >
        View
      </Button>

      {children}
    </Panel>
  );
}
