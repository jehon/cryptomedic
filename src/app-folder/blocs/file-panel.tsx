import React from "react";

import Panel from "../../widget/panel";
import { Button } from "react-bootstrap";
import { icons } from "../../config";
import Pojo from "../../business/abstracts/pojo";
import Folder from "../../business/folder";

export default function FilePanel({
  file,
  folder,
  header,
  children,
  closed
}: {
  file: Pojo;
  folder: Folder;
  header: React.ReactNode;
  children: React.ReactNode;
  closed?: boolean;
}): React.ReactNode {
  return (
    <Panel
      closed={closed}
      headers={[
        <span>
          <img src={icons.models.patient} alt="Patient" className="inline" />
          <span className="no-mobile">{file.getTitle()}</span>
          {header}
        </span>
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
