import React from "react";

import PatientRelated from "../../business/abstracts/patient-related";

import Panel from "../../widget/panel";
import { Button } from "react-bootstrap";
import { icons } from "../../config";

export default function FilePanel({
  file,
  header,
  children,
  closed
}: {
  header: React.ReactNode;
  file: PatientRelated;
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
        href={"#/folder/" + file.getFolder()?.getId() + "/"}
        variant="outline-info"
        style={{ width: "100%" }}
      >
        View
      </Button>

      {children}
    </Panel>
  );
}
