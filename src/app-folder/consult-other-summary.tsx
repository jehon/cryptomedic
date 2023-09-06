import React from "react";

import ConsultOther from "../business/other-consult";
import Folder from "../business/folder";

import Button from "react-bootstrap/Button";
import ConsultAbstractIntroduction from "./blocs/consult-abstract-introduction";
import ConsultAbstractConclusion from "./blocs/consult-abstract-conclusion";

import TwoColumns from "../widget/two-columns";
import Panel from "../widget/panel";
import IO from "../widget/io";
import { icons } from "../config";
import { date2HumanString, normalizeDate } from "../utils/date";

export default function ConsultOtherSummary({
  file,
  folder
}: {
  file: ConsultOther;
  folder: Folder;
}): React.ReactNode {
  if (!folder) {
    return <div>No folder selected</div>;
  }
  if (!file) {
    return <div>No file selected</div>;
  }
  return (
    <Panel
      headers={[
        <img
          src={icons.models.consult_other}
          alt="Other Consult"
          className="inline"
        />,
        <span className="no-mobile">Other Consult</span>,
        <span>{date2HumanString(normalizeDate(file.date))}</span>
      ]}
    >
      <Button
        href={
          "#/folder/" + folder.getId() + "/file/OtherConsult/" + file.getId()
        }
        variant="outline-info"
        style={{ width: "100%" }}
      >
        View
      </Button>
      <ConsultAbstractIntroduction file={file}></ConsultAbstractIntroduction>
      <TwoColumns>
        <Panel label="Orthopedic data">
          <IO.List label="Side" value={file.side}></IO.List>
          <IO.String
            label="Joints or Bones Affected"
            value={file.joints_or_bones_affected}
          ></IO.String>
          <IO.String label="Deformity" value={file.deformity}></IO.String>
          <IO.String
            label="Articulation Mobility"
            value={file.articulation_mobility}
          ></IO.String>
          <IO.String
            label="Muscle Strength"
            value={file.muscle_strength}
          ></IO.String>
          <IO.List label="Pain" value={file.pain}></IO.List>
          <IO.List label="Walk" value={file.walk}></IO.List>
          <IO.String label="XRay" value={file.xray}></IO.String>
        </Panel>
        <Panel label="Orthopedic observations">
          <IO.Text label="Performed" value={file.performed}></IO.Text>
          <IO.Text label="Not Performed" value={file.not_performed}></IO.Text>
        </Panel>
      </TwoColumns>
      <ConsultAbstractConclusion file={file}></ConsultAbstractConclusion>
    </Panel>
  );
}
