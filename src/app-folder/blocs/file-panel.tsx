import React from "react";

import PatientRelated from "../../business/abstracts/patient-related";

import Panel from "../../widget/panel";
import { Button } from "react-bootstrap";

export default function FilePanel({
  type,
  file,
  closed,
  children
}: {
  type: string;
  closed?: boolean;
  file: PatientRelated;
  children: React.ReactNode;
}): React.ReactNode {
  return (
    <Panel closed headers={[<span>{type}</span>]}>
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
