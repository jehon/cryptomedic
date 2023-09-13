import React from "react";

import ConsultRicket from "../business/ricket-consult";
import Folder from "../business/folder";

import ConsultAbstractIntroduction from "./blocs/consult-abstract-introduction";
import ConsultAbstractConclusion from "./blocs/consult-abstract-conclusion";

import FilePanel from "./blocs/file-panel";
import TwoColumns from "../widget/two-columns";
import Panel from "../widget/panel";
import IO from "../widget/io";
import { ImgSideLeft, ImgSideRight } from "../widget/images";

export default function ConsultRicketSummary({
  file,
  folder
}: {
  file: ConsultRicket;
  folder: Folder;
}): React.ReactNode {
  return (
    <FilePanel closed file={file} folder={folder}>
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
        <Panel header={[<ImgSideRight></ImgSideRight>, <span>Right Leg</span>]}>
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
        <Panel header={[<ImgSideLeft></ImgSideLeft>, <span>Left leg</span>]}>
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
    </FilePanel>
  );
}
