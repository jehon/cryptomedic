import React from "react";

import ConsultClubfoot from "../business/club-foot";
import Folder from "../business/folder";

import Button from "react-bootstrap/Button";
import { ImgSideLeft, ImgSideRight } from "../widget/images";
import ConsultAbstractIntroduction from "./blocs/consult-abstract-introduction";
import ConsultAbstractConclusion from "./blocs/consult-abstract-conclusion";

import TwoColumns from "../widget/two-columns";
import Panel from "../widget/panel";
import IO from "../widget/io";
import { icons } from "../config";
import { date2HumanString, normalizeDate } from "../utils/date";

export default function ConsultClubfootSummary({
  file,
  folder
}: {
  file: ConsultClubfoot;
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
          src={icons.models.consult_clubfoot}
          alt="Clubfoot"
          className="inline"
        />,
        <span className="no-mobile">Clubfoot Consult</span>,
        <span>{date2HumanString(normalizeDate(file.date))}</span>,
        <span className="with-image">
          <ImgSideRight></ImgSideRight>
          {file.getPiraniRight() as number}
        </span>,
        <div className="with-image">
          <ImgSideLeft></ImgSideLeft>
          {file.getPiraniLeft() as number}
        </div>
      ]}
    >
      <Button
        href={"#/folder/" + folder.getId() + "/file/ClubFoot/" + file.getId()}
        variant="outline-info"
        style={{ width: "100%" }}
      >
        View
      </Button>
      <ConsultAbstractIntroduction file={file}></ConsultAbstractIntroduction>
      <TwoColumns>
        <Panel fixed label="Pirani Right">
          <div className="with-image">
            <ImgSideRight></ImgSideRight>
            Right side
          </div>
        </Panel>
        <Panel fixed label="Pirani Left">
          <div className="with-image">
            <ImgSideLeft></ImgSideLeft>
            Left side
          </div>
        </Panel>
      </TwoColumns>
      <ConsultAbstractConclusion file={file}></ConsultAbstractConclusion>
    </Panel>
  );
}
