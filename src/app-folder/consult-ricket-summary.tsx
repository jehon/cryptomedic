import React from "react";

import ConsultRicket from "../business/ricket-consult";
import Folder from "../business/folder";

import Button from "react-bootstrap/Button";
import ConsultAbstractIntroduction from "./blocs/consult-abstract-introduction";
import ConsultAbstractConclusion from "./blocs/consult-abstract-conclusion";

import TwoColumns from "../widget/two-columns";
import Panel from "../widget/panel";
import IO from "../widget/io";
import { icons } from "../config";
import { ImgSideLeft, ImgSideRight } from "../widget/images";
import { date2HumanString, normalizeDate } from "../utils/date";

export default function ConsultRicketSummary({
  file,
  folder
}: {
  file: ConsultRicket;
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
      closed
      headers={[
        <img
          src={icons.models.consult_ricket}
          alt="Ricket Consult"
          className="inline"
        />,
        <span className="no-mobile">Ricket Consult</span>,
        <span>{date2HumanString(normalizeDate(file.date))}</span>
      ]}
    >
      <Button
        href={
          "#/folder/" + folder.getId() + "/file/RicketConsult/" + file.getId()
        }
        variant="outline-info"
        style={{ width: "100%" }}
      >
        View
      </Button>
      <ConsultAbstractIntroduction file={file}></ConsultAbstractIntroduction>
      <TwoColumns>
        <Panel label="Ricket Data">
          <IO.List
            label="Walking difficulties"
            value={file.walking_difficulties}
          ></IO.List>
          <IO.List label="Pain" value={file.pain}></IO.List>
          <IO.List
            label="Wrist Enlargement"
            value={file.wrist_enlargement}
          ></IO.List>
          <IO.List label="Rib Heading" value={file.rib_heading}></IO.List>
          <IO.Text left label="XRay" value={file.xray}></IO.Text>
        </Panel>
      </TwoColumns>
      <TwoColumns>
        <Panel
          headers={[<ImgSideRight></ImgSideRight>, <span>Right Leg</span>]}
        >
          <IO.List right label="Leg" value={file.right_leg}></IO.List>
          <IO.Number
            right
            label="Leg Angle"
            value={file.right_leg_angle}
          ></IO.Number>
          <IO.Number
            right
            label="Cross Right T"
            value={file.cross_right_T}
          ></IO.Number>
          <IO.Number
            right
            label="Cross Right F"
            value={file.cross_right_F}
          ></IO.Number>
          <IO.Number
            right
            label="IMIC Distance"
            value={file.IMIC_distance}
          ></IO.Number>
        </Panel>
        <Panel headers={[<ImgSideLeft></ImgSideLeft>, <span>Left leg</span>]}>
          <IO.List left label="Leg" value={file.left_leg}></IO.List>
          <IO.Number
            left
            label="Leg Angle"
            value={file.left_leg_angle}
          ></IO.Number>
          <IO.Number left label="Cross T" value={file.cross_left_T}></IO.Number>
          <IO.Number left label="Cross F" value={file.cross_left_F}></IO.Number>
          <IO.Number
            left
            label="IMIC Distance"
            value={file.IMIC_distance}
          ></IO.Number>
        </Panel>
      </TwoColumns>
      <ConsultAbstractConclusion file={file}></ConsultAbstractConclusion>
    </Panel>
  );
}
